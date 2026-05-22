import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { APP_GUARD } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "@/features/auth/auth.service";
import { UsersModule } from "@/features/users/users.module";
import { AuthGuard } from "@/features/auth/guards/auth.guard";
import { RolesGuard } from "@/features/auth/guards/roles.guard";
import { AuthController } from "@/features/auth/auth.controller";

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,

    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ],
  imports: [
    UsersModule,

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
export class AuthModule {}
