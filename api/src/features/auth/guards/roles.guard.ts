import { Reflector } from "@nestjs/core";
import { UserRole } from "@/features/users/entities/user.entity";
import { ROLES_KEY } from "@/features/auth/decorators/roles.decorator";
import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (!roles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    return roles.includes(user.role);
  }
}
