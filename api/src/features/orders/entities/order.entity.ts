import { UserEntity } from "@/features/users/entities/user.entity";
import { ConcertEntity } from "@/features/concerts/entities/concert.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";

export enum OrderStatus {
  RESERVED = "RESERVED",
  CANCELLED = "CANCELLED"
}

@Entity({
  name: "orders"
})
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "enum",
    enum: OrderStatus,
    default: OrderStatus.RESERVED
  })
  status: OrderStatus;

  @JoinColumn({ name: "user_id" })
  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: UserEntity;

  @Column()
  user_id: number;

  @JoinColumn({ name: "concert_id" })
  @ManyToOne(() => ConcertEntity, (concert) => concert.orders)
  concert: ConcertEntity;

  @Column()
  concert_id: number;

  @Column({
    type: "date",
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP"
  })
  created_at: Date;

  constructor(partial: Partial<OrderEntity>) {
    Object.assign(this, partial);
  }
}
