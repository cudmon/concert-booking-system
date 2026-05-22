import { UserRole } from "@/features/users/entities/user.entity";
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength
} from "class-validator";

export class RegisterDto {
  @MinLength(3)
  @MaxLength(50)
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @MinLength(6)
  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  password: string;

  @MinLength(2)
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(UserRole)
  @IsString()
  @IsNotEmpty()
  role: UserRole;
}
