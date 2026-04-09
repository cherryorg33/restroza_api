import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Orders } from "./Orders";
import { Paymentmethods } from "./Paymentmethods";
import { Paymentstatuses } from "./Paymentstatuses";

@Index("orderId", ["orderId"], {})
@Index("paymentMethodId", ["paymentMethodId"], {})
@Index("paymentStatusId", ["paymentStatusId"], {})
@Entity("orderpayments", { schema: "restroza_dev" })
export class Orderpayments {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "orderId", unsigned: true })
  orderId: number;

  @Column("int", { name: "paymentMethodId", unsigned: true })
  paymentMethodId: number;

  @Column("int", { name: "paymentStatusId", unsigned: true })
  paymentStatusId: number;

  @Column("decimal", { name: "amount", precision: 10, scale: 2 })
  amount: string;

  @Column("varchar", { name: "transactionId", nullable: true, length: 150 })
  transactionId: string | null;

  @Column("datetime", { name: "paidAt", nullable: true })
  paidAt: Date | null;

  @ManyToOne(() => Orders, (orders) => orders.orderpayments, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "orderId", referencedColumnName: "id" }])
  order: Orders;

  @ManyToOne(
    () => Paymentmethods,
    (paymentmethods) => paymentmethods.orderpayments,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "paymentMethodId", referencedColumnName: "id" }])
  paymentMethod: Paymentmethods;

  @ManyToOne(
    () => Paymentstatuses,
    (paymentstatuses) => paymentstatuses.orderpayments,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "paymentStatusId", referencedColumnName: "id" }])
  paymentStatus: Paymentstatuses;
}
