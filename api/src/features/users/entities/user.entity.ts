import { OrderEntity } from "@/features/orders/entities/order.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN"
}

@Entity({
  name: "users"
})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 255
  })
  name: string;

  @Column({
    type: "varchar",
    length: 255,
    unique: true
  })
  email: string;

  @Column({
    type: "varchar",
    length: 255
  })
  password: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER
  })
  role: UserRole;

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[];

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
