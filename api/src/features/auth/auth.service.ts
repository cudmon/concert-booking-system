import argon from "argon2";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "@/features/users/users.service";
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from "@nestjs/common";
import { UserRole } from "../users/entities/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService
  ) {}

  async me(id: number) {
    const user = await this.usersService.findById(id);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const valid = await argon.verify(user.password, password);

    if (!valid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return this.jwtService.sign({
      id: user.id,
      role: user.role
    });
  }

  async register(
    name: string,
    email: string,
    password: string,
    role: UserRole
  ) {
    const user = await this.usersService.findByEmail(email);

    if (user) {
      throw new ConflictException("User with this email already exists");
    }

    await this.usersService.create({
      name,
      email,
      password,
      role
    });

    return this.login(email, password);
  }
}
