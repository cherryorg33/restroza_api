import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Employeedetails } from "./Employeedetails";

@Index("employeeId", ["employeeId"], {})
@Entity("leaves", { schema: "restroza_dev" })
export class Leaves {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "employeeId", nullable: true, unsigned: true })
  employeeId: number | null;

  @Column("date", { name: "fromDate", nullable: true })
  fromDate: string | null;

  @Column("date", { name: "toDate", nullable: true })
  toDate: string | null;

  @Column("varchar", { name: "reason", nullable: true, length: 255 })
  reason: string | null;

  @Column("enum", {
    name: "status",
    nullable: true,
    enum: ["PENDING", "APPROVED", "REJECTED"],
    default: () => "'PENDING'",
  })
  status: "PENDING" | "APPROVED" | "REJECTED" | null;

  @Column("timestamp", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @ManyToOne(
    () => Employeedetails,
    (employeedetails) => employeedetails.leaves,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "employeeId", referencedColumnName: "id" }])
  employee: Employeedetails;
}
