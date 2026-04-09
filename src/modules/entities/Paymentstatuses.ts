import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Orderpayments } from "./Orderpayments";
import { Salarypayments } from "./Salarypayments";
import { Subscriptionpayments } from "./Subscriptionpayments";

@Index("statusCode", ["statusCode"], { unique: true })
@Index("statusName", ["statusName"], { unique: true })
@Entity("paymentstatuses", { schema: "restroza_dev" })
export class Paymentstatuses {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "statusName", unique: true, length: 50 })
  statusName: string;

  @Column("varchar", { name: "statusCode", unique: true, length: 50 })
  statusCode: string;

  @Column("tinyint", {
    name: "isActive",
    nullable: true,
    width: 1,
    default: () => "'1'",
  })
  isActive: boolean | null;

  @Column("timestamp", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("timestamp", {
    name: "updated_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date | null;

  @OneToMany(
    () => Orderpayments,
    (orderpayments) => orderpayments.paymentStatus
  )
  orderpayments: Orderpayments[];

  @OneToMany(
    () => Salarypayments,
    (salarypayments) => salarypayments.paymentStatus
  )
  salarypayments: Salarypayments[];

  @OneToMany(
    () => Subscriptionpayments,
    (subscriptionpayments) => subscriptionpayments.paymentStatus
  )
  subscriptionpayments: Subscriptionpayments[];
}
