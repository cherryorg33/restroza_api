import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Payroll } from "./Payroll";
import { Paymentmethods } from "./Paymentmethods";
import { Paymentstatuses } from "./Paymentstatuses";

@Index("paymentMethodId", ["paymentMethodId"], {})
@Index("paymentStatusId", ["paymentStatusId"], {})
@Index("payrollId", ["payrollId"], {})
@Entity("salarypayments", { schema: "restroza_dev" })
export class Salarypayments {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "payrollId", unsigned: true })
  payrollId: number;

  @Column("int", { name: "paymentMethodId", unsigned: true })
  paymentMethodId: number;

  @Column("int", { name: "paymentStatusId", unsigned: true })
  paymentStatusId: number;

  @Column("decimal", {
    name: "amount",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  amount: string | null;

  @Column("varchar", { name: "transactionId", nullable: true, length: 150 })
  transactionId: string | null;

  @Column("datetime", { name: "paidAt", nullable: true })
  paidAt: Date | null;

  @Column("timestamp", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @ManyToOne(() => Payroll, (payroll) => payroll.salarypayments, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "payrollId", referencedColumnName: "id" }])
  payroll: Payroll;

  @ManyToOne(
    () => Paymentmethods,
    (paymentmethods) => paymentmethods.salarypayments,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "paymentMethodId", referencedColumnName: "id" }])
  paymentMethod: Paymentmethods;

  @ManyToOne(
    () => Paymentstatuses,
    (paymentstatuses) => paymentstatuses.salarypayments,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "paymentStatusId", referencedColumnName: "id" }])
  paymentStatus: Paymentstatuses;
}
