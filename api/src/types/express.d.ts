import { CurrentUser } from "@/features/auth/decorators/current-user.decorator";

declare global {
  namespace Express {
    interface Request {
      user?: CurrentUser;
    }
  }
}

export {};
