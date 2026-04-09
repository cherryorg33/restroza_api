import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("attendance", { schema: "restroza" })
export class Attendance {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "user_id", nullable: true })
  userId: number | null;

  @Column("int", { name: "branch_id", nullable: true })
  branchId: number | null;

  @Column("date", { name: "attendance_date" })
  attendanceDate: string;

  @Column("datetime", { name: "check_in_time", nullable: true })
  checkInTime: Date | null;

  @Column("datetime", { name: "check_out_time", nullable: true })
  checkOutTime: Date | null;

  @Column("enum", {
    name: "status",
    enum: ["Present", "Absent", "HalfDay", "Leave"],
  })
  status: "Present" | "Absent" | "HalfDay" | "Leave";

  @Column("decimal", {
    name: "total_hours",
    nullable: true,
    precision: 5,
    scale: 2,
  })
  totalHours: string | null;

  @Column("varchar", { name: "notes", nullable: true, length: 500 })
  notes: string | null;

  @Column("datetime", {
    name: "created_at",
    nullable: true,
    default: () => "'now()'",
  })
  createdAt: Date | null;

  @Column("datetime", {
    name: "updated_at",
    nullable: true,
    default: () => "'now()'",
  })
  updatedAt: Date | null;
}
