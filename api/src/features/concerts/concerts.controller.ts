import { UserRole } from "@/features/users/entities/user.entity";
import { Roles } from "@/features/auth/decorators/roles.decorator";
import { ConcertsService } from "@/features/concerts/concerts.service";
import { CreateConcertDto } from "@/features/concerts/dto/create-concert.dto";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post
} from "@nestjs/common";

@Controller("concerts")
export class ConcertsController {
  constructor(private readonly concertsService: ConcertsService) {}

  @Get()
  @Roles(UserRole.ADMIN, UserRole.USER)
  async findAll() {
    return this.concertsService.findAll();
  }

  @Post()
  @Roles(UserRole.ADMIN)
  async create(@Body() data: CreateConcertDto) {
    return this.concertsService.create(data);
  }

  @Delete(":id")
  @Roles(UserRole.ADMIN)
  async delete(@Param("id", ParseIntPipe) id: number) {
    return this.concertsService.delete(id);
  }
}
