import { JwtModule } from "@nestjs/jwt";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        autoLoadEntities: true,
        host: configService.getOrThrow<string>("DB_HOST"),
        port: configService.getOrThrow<number>("DB_PORT"),
        database: configService.getOrThrow<string>("DB_NAME"),
        username: configService.getOrThrow<string>("DB_USERNAME"),
        password: configService.getOrThrow<string>("DB_PASSWORD")
      })
    }),

    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>("JWT_SECRET"),
        signOptions: {
          expiresIn: "1h"
        }
      })
    })
  ]
})
export class AppModule {}
