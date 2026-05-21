import { OrderEntity } from "@/features/orders/entities/order.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: "concerts"
})
export class ConcertEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 255,
    unique: true
  })
  name: string;

  @Column({
    type: "int",
    default: 0
  })
  capacity: number;

  @Column({
    type: "int",
    default: 0
  })
  sold_tickets: number;

  @OneToMany(() => OrderEntity, (order) => order.concert)
  orders: OrderEntity[];

  constructor(partial: Partial<ConcertEntity>) {
    Object.assign(this, partial);
  }
}
