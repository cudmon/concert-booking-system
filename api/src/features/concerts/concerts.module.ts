import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConcertsService } from "@/features/concerts/concerts.service";
import { ConcertEntity } from "@/features/concerts/entities/concert.entity";
import { ConcertsController } from "@/features/concerts/concerts.controller";

@Module({
  controllers: [ConcertsController],
  providers: [ConcertsService],
  exports: [ConcertsService],
  imports: [TypeOrmModule.forFeature([ConcertEntity])]
})
export class ConcertsModule {}
