import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Attendance } from "./Attendance";
import { Users } from "./Users";
import { Leaves } from "./Leaves";
import { Payroll } from "./Payroll";

@Index("employeeCode", ["employeeCode"], { unique: true })
@Index("userId", ["userId"], {})
@Entity("employeedetails", { schema: "restroza_dev" })
export class Employeedetails {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "userId", unsigned: true })
  userId: number;

  @Column("int", { name: "businessId", unsigned: true })
  businessId: number;

  @Column("int", { name: "branchId", nullable: true, unsigned: true })
  branchId: number | null;

  @Column("varchar", {
    name: "employeeCode",
    nullable: true,
    unique: true,
    length: 50,
  })
  employeeCode: string | null;

  @Column("varchar", { name: "designation", nullable: true, length: 100 })
  designation: string | null;

  @Column("date", { name: "joiningDate", nullable: true })
  joiningDate: string | null;

  @Column("decimal", { name: "salary", precision: 10, scale: 2 })
  salary: string;

  @Column("enum", {
    name: "salaryType",
    nullable: true,
    enum: ["MONTHLY", "DAILY", "HOURLY"],
    default: () => "'MONTHLY'",
  })
  salaryType: "MONTHLY" | "DAILY" | "HOURLY" | null;

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

  @OneToMany(() => Attendance, (attendance) => attendance.employee)
  attendances: Attendance[];

  @ManyToOne(() => Users, (users) => users.employeedetails, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
  user: Users;

  @OneToMany(() => Leaves, (leaves) => leaves.employee)
  leaves: Leaves[];

  @OneToMany(() => Payroll, (payroll) => payroll.employee)
  payrolls: Payroll[];
}
