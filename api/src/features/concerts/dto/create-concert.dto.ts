import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength
} from "class-validator";

export class CreateConcertDto {
  @MinLength(1)
  @MaxLength(100)
  @IsNotEmpty()
  @IsString()
  name: string;

  @MaxLength(500)
  @IsString()
  @IsOptional()
  description?: string;

  @Min(0)
  @Max(100000)
  @IsNotEmpty()
  capacity: number;
}
