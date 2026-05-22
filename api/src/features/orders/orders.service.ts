import { DataSource, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { IOrderCancel, IOrderCreate } from "@/features/orders/orders.interface";
import {
  BadRequestException,
  Injectable,
  NotFoundException
} from "@nestjs/common";
import {
  OrderEntity,
  OrderStatus
} from "@/features/orders/entities/order.entity";
import { ConcertEntity } from "@/features/concerts/entities/concert.entity";

@Injectable()
export class OrdersService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(OrderEntity)
    private readonly ordersRepository: Repository<OrderEntity>
  ) {}

  async findAll(): Promise<OrderEntity[]> {
    return this.ordersRepository.find();
  }

  async findById(id: number): Promise<OrderEntity> {
    const order = await this.ordersRepository.findOneBy({
      id
    });

    if (!order) {
      throw new NotFoundException("Order not found");
    }

    return order;
  }

  async create(data: IOrderCreate): Promise<OrderEntity> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const existed = await queryRunner.manager.findOne(OrderEntity, {
        where: {
          user_id: data.user_id,
          concert_id: data.concert_id,
          status: OrderStatus.RESERVED
        }
      });

      if (existed) {
        throw new BadRequestException(
          "You have already reserved a ticket for this concert"
        );
      }

      const concert = await queryRunner.manager.findOne(ConcertEntity, {
        where: {
          id: data.concert_id
        }
      });

      if (!concert) {
        throw new NotFoundException("Concert not found");
      }

      if (concert.sold_tickets >= concert.capacity) {
        throw new BadRequestException("Concert is sold out");
      }

      const order = await queryRunner.manager.save(
        this.ordersRepository.create(data)
      );

      await queryRunner.manager.increment(
        ConcertEntity,
        {
          id: data.concert_id
        },
        "sold_tickets",
        1
      );

      await queryRunner.commitTransaction();

      return order;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async cancel(data: IOrderCancel): Promise<OrderEntity> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const order = await queryRunner.manager.findOne(OrderEntity, {
        where: {
          id: data.id,
          user_id: data.user_id
        }
      });

      if (!order) {
        throw new NotFoundException("Order not found");
      }

      if (order.status === OrderStatus.CANCELLED) {
        return order;
      }

      order.status = OrderStatus.CANCELLED;

      await queryRunner.manager.save(order);

      await queryRunner.manager.decrement(
        ConcertEntity,
        {
          id: order.concert_id
        },
        "sold_tickets",
        1
      );

      await queryRunner.commitTransaction();

      return order;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
