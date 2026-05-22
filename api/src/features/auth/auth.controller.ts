import type { Response } from "express";
import { LoginDto } from "@/features/auth/dto/login.dto";
import { AuthService } from "@/features/auth/auth.service";
import { Body, Controller, Post, Res } from "@nestjs/common";
import { RegisterDto } from "@/features/auth/dto/register.dto";
import { Public } from "@/features/auth/decorators/public.decorator";

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
      data.password
    );

    return this.authenticate(res, token);
  }

  private async authenticate(res: Response, token: string) {
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict"
    });
  }
}
