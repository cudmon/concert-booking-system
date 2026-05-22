import { Repository } from "typeorm";
import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IConcertCreate } from "@/features/concerts/concerts.interface";
import { ConcertEntity } from "@/features/concerts/entities/concert.entity";

@Injectable()
export class ConcertsService {
  constructor(
    @InjectRepository(ConcertEntity)
    private readonly concertRepository: Repository<ConcertEntity>
  ) {}

  async findAll(): Promise<ConcertEntity[]> {
    return this.concertRepository.find({
      order: {
        id: "DESC"
      }
    });
  }

  async findOne(id: number): Promise<ConcertEntity | null> {
    return this.concertRepository.findOneBy({
      id
    });
  }

  async create(data: IConcertCreate): Promise<ConcertEntity> {
    const duplicate = await this.concertRepository.findOneBy({
      name: data.name
    });

    if (duplicate) {
      throw new ConflictException("Concert with this name already exists");
    }

    const concert = this.concertRepository.create(data);

    return this.concertRepository.save(concert);
  }

  async delete(id: number): Promise<void> {
    await this.concertRepository.delete(id);
  }
}
