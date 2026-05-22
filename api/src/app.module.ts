import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "@/features/auth/auth.module";
import { dataSourceOptions } from "@/database/datasource";
import { UsersModule } from "@/features/users/users.module";
import { OrdersModule } from "@/features/orders/orders.module";
import { ConcertsModule } from "@/features/concerts/concerts.module";

@Module({
  imports: [
    AuthModule,
    UsersModule,
    OrdersModule,
    ConcertsModule,

    ConfigModule.forRoot({
      isGlobal: true
    }),

    TypeOrmModule.forRoot(dataSourceOptions)
  ]
})
export class AppModule {}
