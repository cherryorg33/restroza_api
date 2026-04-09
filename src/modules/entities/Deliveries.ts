import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Orders } from "./Orders";
import { Users } from "./Users";

@Index("deliveryUserId", ["deliveryUserId"], {})
@Index("orderId", ["orderId"], {})
@Entity("deliveries", { schema: "restroza_dev" })
export class Deliveries {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "orderId", unsigned: true })
  orderId: number;

  @Column("int", { name: "deliveryUserId", nullable: true, unsigned: true })
  deliveryUserId: number | null;

  @Column("enum", {
    name: "deliveryStatus",
    nullable: true,
    enum: ["ASSIGNED", "PICKED", "ON_THE_WAY", "DELIVERED"],
    default: () => "'ASSIGNED'",
  })
  deliveryStatus: "ASSIGNED" | "PICKED" | "ON_THE_WAY" | "DELIVERED" | null;

  @Column("varchar", { name: "deliveryAddress", nullable: true, length: 255 })
  deliveryAddress: string | null;

  @Column("datetime", { name: "deliveredAt", nullable: true })
  deliveredAt: Date | null;

  @Column("timestamp", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @ManyToOne(() => Orders, (orders) => orders.deliveries, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "orderId", referencedColumnName: "id" }])
  order: Orders;

  @ManyToOne(() => Users, (users) => users.deliveries, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "deliveryUserId", referencedColumnName: "id" }])
  deliveryUser: Users;
}
