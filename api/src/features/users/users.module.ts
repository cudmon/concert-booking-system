import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from "@/features/users/users.service";
import { UserEntity } from "@/features/users/entities/user.entity";

@Module({
  exports: [UsersService],
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([UserEntity])]
})
export class UsersModule {}
