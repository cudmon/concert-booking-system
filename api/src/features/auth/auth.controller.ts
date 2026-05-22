import type { Response } from "express";
import { LoginDto } from "@/features/auth/dto/login.dto";
import { AuthService } from "@/features/auth/auth.service";
import { RegisterDto } from "@/features/auth/dto/register.dto";
import { UserRole } from "@/features/users/entities/user.entity";
import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { Roles } from "@/features/auth/decorators/roles.decorator";
import { Public } from "@/features/auth/decorators/public.decorator";
import { CurrentUser } from "@/features/auth/decorators/current-user.decorator";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("login")
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() data: LoginDto
  ) {
    const token = await this.authService.login(data.email, data.password);

    return this.authenticate(res, token);
  }

  @Public()
  @Post("register")
  async register(
    @Res({ passthrough: true }) res: Response,
    @Body() data: RegisterDto
  ) {
    const token = await this.authService.register(
      data.name,
      data.email,
      data.password,
      data.role
    );

    return this.authenticate(res, token);
  }

  @Get("me")
  @Roles(UserRole.ADMIN, UserRole.USER)
  async me(@CurrentUser() user: CurrentUser) {
    return this.authService.me(user.id);
  }

  @Post("logout")
  @Roles(UserRole.ADMIN, UserRole.USER)
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict"
    });
  }

  private async authenticate(res: Response, token: string) {
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict"
    });
  }
}
