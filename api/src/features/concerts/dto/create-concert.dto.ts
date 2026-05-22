import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength
} from "class-validator";

export class CreateConcertDto {
  @MinLength(3)
  @MaxLength(100)
  @IsNotEmpty()
  @IsString()
  name: string;

  @MaxLength(500)
  @IsString()
  @IsOptional()
  description?: string;
}
