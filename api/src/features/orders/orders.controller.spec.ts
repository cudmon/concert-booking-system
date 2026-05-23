import { Test } from "@nestjs/testing";
import { OrdersService } from "@/features/orders/orders.service";
import { OrderEntity } from "@/features/orders/entities/order.entity";
import { OrdersController } from "@/features/orders/orders.controller";

describe("OrdersController", () => {
  let controller: OrdersController;
  let service: jest.Mocked<OrdersService>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: OrdersService,

          useValue: {
            findAll: jest.fn(),
            create: jest.fn(),
            cancel: jest.fn()
          }
        }
      ]
    }).compile();

    controller = module.get(OrdersController);
    service = module.get(OrdersService);
  });

  it("findAll should return an array of Orders", async () => {
    const data = [
      new OrderEntity({
        concert_id: 1,
        user_id: 1
      }),

      new OrderEntity({
        concert_id: 2,
        user_id: 2
      })
    ];

    service.findAll.mockResolvedValue(data);

    const result = await controller.findAll();

    expect(result).toEqual(data);
    expect(service.findAll).toHaveBeenCalled();
  });

  it("create should create a new Order", async () => {
    const data = {
      concert_id: 1,
      user_id: 1
    };

    const user = {
      id: 1,
      role: "USER"
    };

    const created = new OrderEntity({
      id: 1,
      ...data
    });

    service.create.mockResolvedValue(created);

    const result = await controller.create(user, data);

    expect(result).toEqual(created);
    expect(service.create).toHaveBeenCalledWith(data);
  });

  it("cancel should cancel an Order", async () => {
    const id = 1;

    const user = {
      id: 1,
      role: "USER"
    };

    const cancelled = new OrderEntity({
      id,
      concert_id: 1,
      user_id: 1
    });

    service.cancel.mockResolvedValue(cancelled);

    const result = await controller.cancel(user, id);

    expect(result).toEqual(cancelled);
    expect(service.cancel).toHaveBeenCalledWith({ id, user_id: user.id });
  });
});
