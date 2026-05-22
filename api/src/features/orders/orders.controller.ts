import { OrdersService } from "@/features/orders/orders.service";
import { CreateOrderDto } from "@/features/orders/dto/create-order.dto";
import { CurrentUser } from "@/features/auth/decorators/current-user.decorator";
import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Patch,
  Post
} from "@nestjs/common";

@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async findAll() {
    return this.ordersService.findAll();
  }

  @Post()
  async create(@CurrentUser() user: CurrentUser, @Body() data: CreateOrderDto) {
    return this.ordersService.create({
      ...data,
      user_id: user.id
    });
  }

  @Patch(":id/cancel")
  async cancel(
    @CurrentUser() user: CurrentUser,
    @Body("id", ParseIntPipe) id: number
  ) {
    return this.ordersService.cancel({
      id,
      user_id: user.id
    });
  }
}
