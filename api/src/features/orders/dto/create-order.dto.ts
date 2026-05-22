import { IsInt, IsNotEmpty } from "class-validator";

export class CreateOrderDto {
  @IsInt()
  @IsNotEmpty()
  concert_id: number;
}
