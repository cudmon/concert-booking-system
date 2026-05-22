import argon from "argon2";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IUserCreate } from "@/features/users/users.interface";
import { UserEntity } from "@/features/users/entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async findById(id: number): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({
      id
    });
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({
      email
    });
  }

  async create(data: IUserCreate): Promise<UserEntity> {
    const hash = await argon.hash(data.password);

    const user = this.userRepository.create({
      ...data,
      password: hash
    });

    return this.userRepository.save(user);
  }
}
