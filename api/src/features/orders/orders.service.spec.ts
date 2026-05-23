import { DataSource } from "typeorm";
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { OrdersService } from "@/features/orders/orders.service";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import {
  OrderEntity,
  OrderStatus
} from "@/features/orders/entities/order.entity";

type MockedManager = {
  find: jest.Mock;
  findOne: jest.Mock;
  save: jest.Mock;
  create: jest.Mock;
  increment: jest.Mock;
  decrement: jest.Mock;
};

type MockedQueryRunner = {
  manager: MockedManager;
  connect: jest.Mock;
  startTransaction: jest.Mock;
  commitTransaction: jest.Mock;
  rollbackTransaction: jest.Mock;
  release: jest.Mock;
};

type MockedOrdersRepository = {
  find: jest.Mock;
  findOneBy: jest.Mock;
  create: jest.Mock;
};

describe("OrdersService", () => {
  let service: OrdersService;
  let manager: MockedManager;
  let queryRunner: MockedQueryRunner;
  let ordersRepository: MockedOrdersRepository;

  beforeEach(async () => {
    manager = {
      find: jest.fn().mockResolvedValue([]),
      findOne: jest.fn(),
      save: jest.fn(),
      create: jest.fn((_e, data) => data),
      increment: jest.fn(),
      decrement: jest.fn()
    };

    queryRunner = {
      manager,
      connect: jest.fn(),
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      rollbackTransaction: jest.fn(),
      release: jest.fn()
    };

    ordersRepository = {
      find: jest.fn(),
      findOneBy: jest.fn(),
      create: jest.fn((data) => data)
    };

    const module = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: DataSource,
          useValue: {
            createQueryRunner: () => queryRunner
          }
        },
        {
          provide: getRepositoryToken(OrderEntity),
          useValue: ordersRepository
        }
      ]
    }).compile();

    service = module.get(OrdersService);
  });

  describe("create", () => {
    const payload = { user_id: 1, concert_id: 99 };

    it("reserves and increments sold_tickets", async () => {
      manager.findOne.mockResolvedValue({
        capacity: 10,
        sold_tickets: 0
      });

      manager.save.mockResolvedValue({
        id: 1,
        ...payload
      });

      await service.create(payload);

      expect(manager.save).toHaveBeenCalled();
      expect(manager.increment).toHaveBeenCalled();
      expect(queryRunner.commitTransaction).toHaveBeenCalled();
    });

    it("rejects a duplicate reservation", async () => {
      manager.find.mockResolvedValue([
        {
          status: OrderStatus.RESERVED
        }
      ]);

      await expect(service.create(payload)).rejects.toThrow(
        BadRequestException
      );
    });

    it("rejects when the concert is sold out", async () => {
      manager.findOne.mockResolvedValue({
        capacity: 5,
        sold_tickets: 5
      });

      await expect(service.create(payload)).rejects.toThrow(
        BadRequestException
      );
    });

    it("rejects when the concert does not exist", async () => {
      manager.findOne.mockResolvedValue(null);

      await expect(service.create(payload)).rejects.toThrow(NotFoundException);
    });
  });

  describe("cancel", () => {
    const payload = {
      id: 1,
      user_id: 1
    };

    it("creates a cancelled record and decrements sold_tickets", async () => {
      manager.findOne.mockResolvedValue({
        ...payload,
        concert_id: 99,
        status: OrderStatus.RESERVED
      });

      manager.save.mockResolvedValue({
        status: OrderStatus.CANCELLED
      });

      await service.cancel(payload);

      expect(manager.save).toHaveBeenCalled();
      expect(manager.decrement).toHaveBeenCalled();
      expect(queryRunner.commitTransaction).toHaveBeenCalled();
    });

    it("if the order is already cancelled", async () => {
      manager.findOne.mockResolvedValue({
        ...payload,
        concert_id: 99,
        status: OrderStatus.CANCELLED
      });

      await service.cancel(payload);

      expect(manager.save).not.toHaveBeenCalled();
      expect(manager.decrement).not.toHaveBeenCalled();
    });

    it("throws when the order is not found", async () => {
      manager.findOne.mockResolvedValue(null);

      await expect(service.cancel(payload)).rejects.toThrow(NotFoundException);
    });
  });
});
