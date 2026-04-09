import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Employeedetails } from "./Employeedetails";

@Index("uniq_employee_date", ["employeeId", "attendanceDate"], { unique: true })
@Entity("attendance", { schema: "restroza_dev" })
export class Attendance {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "employeeId", unsigned: true })
  employeeId: number;

  @Column("date", { name: "attendanceDate" })
  attendanceDate: string;

  @Column("datetime", { name: "checkIn", nullable: true })
  checkIn: Date | null;

  @Column("datetime", { name: "checkOut", nullable: true })
  checkOut: Date | null;

  @Column("enum", {
    name: "status",
    nullable: true,
    enum: ["PRESENT", "ABSENT", "HALF_DAY", "LEAVE"],
    default: () => "'PRESENT'",
  })
  status: "PRESENT" | "ABSENT" | "HALF_DAY" | "LEAVE" | null;

  @Column("decimal", {
    name: "workingHours",
    nullable: true,
    precision: 5,
    scale: 2,
  })
  workingHours: string | null;

  @Column("timestamp", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @ManyToOne(
    () => Employeedetails,
    (employeedetails) => employeedetails.attendances,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "employeeId", referencedColumnName: "id" }])
  employee: Employeedetails;
}
