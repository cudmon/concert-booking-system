import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrdersService } from "@/features/orders/orders.service";
import { OrderEntity } from "@/features/orders/entities/order.entity";
import { OrdersController } from "@/features/orders/orders.controller";

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
  imports: [TypeOrmModule.forFeature([OrderEntity])]
})
export class OrdersModule {}
