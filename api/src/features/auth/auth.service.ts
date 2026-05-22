import argon from "argon2";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "@/features/users/users.service";
import {
  ConflictException,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { UserRole } from "../users/entities/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService
  ) {}

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
