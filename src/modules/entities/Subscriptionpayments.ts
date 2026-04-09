import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Business } from "./Business";
import { Paymentmethods } from "./Paymentmethods";
import { Plans } from "./Plans";
import { Paymentstatuses } from "./Paymentstatuses";

@Index("fk_subscriptionPayments_method", ["paymentMethodId"], {})
@Index("fk_subscriptionPayments_status", ["paymentStatusId"], {})
@Index("idx_subscription_business", ["businessId"], {})
@Index("idx_subscription_plan", ["planId"], {})
@Entity("subscriptionpayments", { schema: "restroza_dev" })
export class Subscriptionpayments {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "businessId", unsigned: true })
  businessId: number;

  @Column("int", { name: "planId", unsigned: true })
  planId: number;

  @Column("int", { name: "paymentMethodId", unsigned: true })
  paymentMethodId: number;

  @Column("int", { name: "paymentStatusId", unsigned: true })
  paymentStatusId: number;

  @Column("decimal", { name: "amount", precision: 10, scale: 2 })
  amount: string;

  @Column("varchar", {
    name: "currency",
    nullable: true,
    length: 10,
    default: () => "'INR'",
  })
  currency: string | null;

  @Column("varchar", { name: "transactionId", nullable: true, length: 150 })
  transactionId: string | null;

  @Column("varchar", { name: "invoiceNumber", nullable: true, length: 100 })
  invoiceNumber: string | null;

  @Column("date", { name: "startDate" })
  startDate: string;

  @Column("date", { name: "endDate" })
  endDate: string;

  @Column("datetime", { name: "paidAt", nullable: true })
  paidAt: Date | null;

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

  @ManyToOne(() => Business, (business) => business.subscriptionpayments, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "businessId", referencedColumnName: "id" }])
  business: Business;

  @ManyToOne(
    () => Paymentmethods,
    (paymentmethods) => paymentmethods.subscriptionpayments,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "paymentMethodId", referencedColumnName: "id" }])
  paymentMethod: Paymentmethods;

  @ManyToOne(() => Plans, (plans) => plans.subscriptionpayments, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "planId", referencedColumnName: "id" }])
  plan: Plans;

  @ManyToOne(
    () => Paymentstatuses,
    (paymentstatuses) => paymentstatuses.subscriptionpayments,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "paymentStatusId", referencedColumnName: "id" }])
  paymentStatus: Paymentstatuses;
}
