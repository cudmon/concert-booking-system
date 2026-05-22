import { UserRole } from "@/features/users/entities/user.entity";
import { OrdersService } from "@/features/orders/orders.service";
import { Roles } from "@/features/auth/decorators/roles.decorator";
import { CreateOrderDto } from "@/features/orders/dto/create-order.dto";
import { CurrentUser } from "@/features/auth/decorators/current-user.decorator";
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post
} from "@nestjs/common";

@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get("me")
  @Roles(UserRole.ADMIN, UserRole.USER)
  async findByUserId(@CurrentUser() user: CurrentUser) {
    return this.ordersService.findByUserId(user.id);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  async findAll() {
    return this.ordersService.findAll();
  }

  @Post()
  @Roles(UserRole.ADMIN, UserRole.USER)
  async create(@CurrentUser() user: CurrentUser, @Body() data: CreateOrderDto) {
    return this.ordersService.create({
      ...data,
      user_id: user.id
    });
  }

  @Patch(":id/cancel")
  @Roles(UserRole.ADMIN, UserRole.USER)
  async cancel(
    @CurrentUser() user: CurrentUser,
    @Param("id", ParseIntPipe) id: number
  ) {
    return this.ordersService.cancel({
      id,
      user_id: user.id
    });
  }
}
