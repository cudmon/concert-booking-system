import { Test } from "@nestjs/testing";
import { ConcertsService } from "@/features/concerts/concerts.service";
import { ConcertEntity } from "@/features/concerts/entities/concert.entity";
import { ConcertsController } from "@/features/concerts/concerts.controller";

describe("ConcertsController", () => {
  let controller: ConcertsController;
  let service: jest.Mocked<ConcertsService>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [ConcertsController],
      providers: [
        {
          provide: ConcertsService,

          useValue: {
            findAll: jest.fn(),
            create: jest.fn(),
            delete: jest.fn()
          }
        }
      ]
    }).compile();

    controller = module.get(ConcertsController);
    service = module.get(ConcertsService);
  });

  it("findAll should return an array of concerts", async () => {
    const data = [
      new ConcertEntity({
        name: "Concert 1",
        description: "Desc 1",
        capacity: 100
      }),

      new ConcertEntity({
        name: "Concert 2",
        description: "Desc 2"
      })
    ];

    service.findAll.mockResolvedValue(data);

    const result = await controller.findAll();

    expect(result).toEqual(data);
    expect(service.findAll).toHaveBeenCalled();
  });

  it("create should create a new concert", async () => {
    const data = {
      name: "New Concert",
      description: "A great concert",
      capacity: 100
    };

    const created = new ConcertEntity({
      id: 1,
      ...data
    });

    service.create.mockResolvedValue(created);

    const result = await controller.create(data);

    expect(result).toEqual(created);
    expect(service.create).toHaveBeenCalledWith(data);
  });

  it("delete should delete a concert", async () => {
    const id = 1;

    service.delete.mockResolvedValue();

    await controller.delete(id);

    expect(service.delete).toHaveBeenCalledWith(id);
  });
});
