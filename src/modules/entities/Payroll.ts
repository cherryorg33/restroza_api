import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Employeedetails } from "./Employeedetails";
import { Salarypayments } from "./Salarypayments";

@Index("employeeId", ["employeeId"], {})
@Entity("payroll", { schema: "restroza_dev" })
export class Payroll {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "employeeId", unsigned: true })
  employeeId: number;

  @Column("varchar", { name: "month", nullable: true, length: 20 })
  month: string | null;

  @Column("int", { name: "totalWorkingDays", nullable: true })
  totalWorkingDays: number | null;

  @Column("int", { name: "presentDays", nullable: true })
  presentDays: number | null;

  @Column("int", { name: "absentDays", nullable: true })
  absentDays: number | null;

  @Column("decimal", {
    name: "basicSalary",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  basicSalary: string | null;

  @Column("decimal", {
    name: "deductions",
    nullable: true,
    precision: 10,
    scale: 2,
    default: () => "'0.00'",
  })
  deductions: string | null;

  @Column("decimal", {
    name: "bonus",
    nullable: true,
    precision: 10,
    scale: 2,
    default: () => "'0.00'",
  })
  bonus: string | null;

  @Column("decimal", {
    name: "netSalary",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  netSalary: string | null;

  @Column("enum", {
    name: "status",
    nullable: true,
    enum: ["PENDING", "PROCESSED", "PAID"],
    default: () => "'PENDING'",
  })
  status: "PENDING" | "PROCESSED" | "PAID" | null;

  @Column("timestamp", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @ManyToOne(
    () => Employeedetails,
    (employeedetails) => employeedetails.payrolls,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "employeeId", referencedColumnName: "id" }])
  employee: Employeedetails;

  @OneToMany(() => Salarypayments, (salarypayments) => salarypayments.payroll)
  salarypayments: Salarypayments[];
}
