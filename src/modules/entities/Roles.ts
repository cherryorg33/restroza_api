import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("roles", { schema: "restroza" })
export class Roles {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "role_name", length: 100 })
  roleName: string;

  @Column("varchar", { name: "role_description", nullable: true, length: 200 })
  roleDescription: string | null;

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
