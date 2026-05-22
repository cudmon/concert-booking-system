import { Body, Controller, Post } from "@nestjs/common";
import { LoginDto } from "@/features/auth/dto/login.dto";
import { AuthService } from "@/features/auth/auth.service";
import { RegisterDto } from "@/features/auth/dto/register.dto";
import { Public } from "@/features/auth/decorators/public.decorator";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("login")
  async login(@Body() data: LoginDto) {
    return this.authService.login(data.email, data.password);
  }

  @Public()
  @Post("register")
  async register(@Body() data: RegisterDto) {
    return this.authService.register(data.name, data.email, data.password);
  }
}
