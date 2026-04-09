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

@Index("methodCode", ["methodCode"], { unique: true })
@Index("methodName", ["methodName"], { unique: true })
@Entity("paymentmethods", { schema: "restroza_dev" })
export class Paymentmethods {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "methodName", unique: true, length: 50 })
  methodName: string;

  @Column("varchar", { name: "methodCode", unique: true, length: 50 })
  methodCode: string;

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
    (orderpayments) => orderpayments.paymentMethod
  )
  orderpayments: Orderpayments[];

  @OneToMany(
    () => Salarypayments,
    (salarypayments) => salarypayments.paymentMethod
  )
  salarypayments: Salarypayments[];

  @OneToMany(
    () => Subscriptionpayments,
    (subscriptionpayments) => subscriptionpayments.paymentMethod
  )
  subscriptionpayments: Subscriptionpayments[];
}
