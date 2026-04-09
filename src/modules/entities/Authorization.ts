import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("authorization", { schema: "restroza" })
export class Authorization {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("tinyint", { name: "pos", width: 1, default: () => "'1'" })
  pos: boolean;

  @Column("tinyint", {
    name: "product_inventory",
    width: 1,
    default: () => "'1'",
  })
  productInventory: boolean;

  @Column("tinyint", {
    name: "attendance",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  attendance: boolean | null;

  @Column("tinyint", {
    name: "hrms",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  hrms: boolean | null;

  @Column("tinyint", {
    name: "payroll",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  payroll: boolean | null;

  @Column("tinyint", {
    name: "kitchen",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  kitchen: boolean | null;

  @Column("tinyint", { name: "mobile_app", width: 1, default: () => "'1'" })
  mobileApp: boolean;

  @Column("tinyint", { name: "owner_access", width: 1, default: () => "'1'" })
  ownerAccess: boolean;

  @Column("tinyint", { name: "reports", width: 1, default: () => "'1'" })
  reports: boolean;

  @Column("int", { name: "business_id", nullable: true })
  businessId: number | null;

  @Column("int", { name: "branch_id", nullable: true })
  branchId: number | null;

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
