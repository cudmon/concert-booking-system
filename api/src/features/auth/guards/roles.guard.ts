import { Reflector } from "@nestjs/core";
import { UserRole } from "@/features/users/entities/user.entity";
import { ROLES_KEY } from "@/features/auth/decorators/roles.decorator";
import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { IS_PUBLIC_KEY } from "@/features/auth/decorators/public.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (isPublic) {
      return true;
    }

    const roles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (!roles) {
      return false;
    }

    const { user } = context.switchToHttp().getRequest();

    return roles.includes(user.role);
  }
}
