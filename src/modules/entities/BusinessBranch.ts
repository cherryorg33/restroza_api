import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("business_branch", { schema: "restroza" })
export class BusinessBranch {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "branch_name", length: 100 })
  branchName: string;

  @Column("varchar", { name: "branch_address", length: 200 })
  branchAddress: string;

  @Column("varchar", { name: "branch_email", length: 100 })
  branchEmail: string;

  @Column("varchar", { name: "branch_password", length: 100 })
  branchPassword: string;

  @Column("varchar", { name: "branch_phone", nullable: true, length: 20 })
  branchPhone: string | null;

  @Column("decimal", {
    name: "branch_tax",
    nullable: true,
    precision: 5,
    scale: 2,
  })
  branchTax: string | null;

  @Column("int", { name: "branch_owner_id", nullable: true })
  branchOwnerId: number | null;

  @Column("int", { name: "business_id", nullable: true })
  businessId: number | null;

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
