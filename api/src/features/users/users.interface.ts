import { UserRole } from "./entities/user.entity";

export interface IUserCreate {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}
