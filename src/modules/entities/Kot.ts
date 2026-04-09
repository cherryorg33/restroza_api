import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Orders } from "./Orders";
import { Kotitems } from "./Kotitems";

@Index("kotNumber", ["kotNumber"], { unique: true })
@Index("orderId", ["orderId"], {})
@Entity("kot", { schema: "restroza_dev" })
export class Kot {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "orderId", unsigned: true })
  orderId: number;

  @Column("varchar", {
    name: "kotNumber",
    nullable: true,
    unique: true,
    length: 50,
  })
  kotNumber: string | null;

  @Column("enum", {
    name: "status",
    nullable: true,
    enum: ["PENDING", "PREPARING", "READY", "SERVED"],
    default: () => "'PENDING'",
  })
  status: "PENDING" | "PREPARING" | "READY" | "SERVED" | null;

  @Column("timestamp", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @ManyToOne(() => Orders, (orders) => orders.kots, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "orderId", referencedColumnName: "id" }])
  order: Orders;

  @OneToMany(() => Kotitems, (kotitems) => kotitems.kot)
  kotitems: Kotitems[];
}
