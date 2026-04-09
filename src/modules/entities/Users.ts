import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("employee_email", ["employeeEmail"], { unique: true })
@Entity("users", { schema: "restroza" })
export class Users {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "employee_name", length: 100 })
  employeeName: string;

  @Column("varchar", { name: "employee_email", unique: true, length: 100 })
  employeeEmail: string;

  @Column("varchar", {
    name: "employee_password",
    length: 100,
    default: () => "'_utf8mb4'restroza''",
  })
  employeePassword: string;

  @Column("varchar", { name: "employee_address", nullable: true, length: 200 })
  employeeAddress: string | null;

  @Column("varchar", { name: "employee_phone", nullable: true, length: 20 })
  employeePhone: string | null;

  @Column("varchar", { name: "employee_aadhar", nullable: true, length: 20 })
  employeeAadhar: string | null;

  @Column("varchar", { name: "employee_photo", nullable: true, length: 255 })
  employeePhoto: string | null;

  @Column("int", { name: "business_id", nullable: true })
  businessId: number | null;

  @Column("int", { name: "branch_id", nullable: true })
  branchId: number | null;

  @Column("int", { name: "payment_type_id", nullable: true })
  paymentTypeId: number | null;

  @Column("tinyint", {
    name: "is_active",
    nullable: true,
    width: 1,
    default: () => "'1'",
  })
  isActive: boolean | null;

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
