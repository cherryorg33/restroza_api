import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BusinessBranch } from "./BusinessBranch";
import { Business } from "./Business";
import { Roles } from "./Roles";
import { Users } from "./Users";

@Index("fk_userRoles_branch", ["branchId"], {})
@Index("fk_userRoles_business", ["businessId"], {})
@Index("fk_userRoles_role", ["roleId"], {})
@Index("uniq_user_role_branch", ["userId", "branchId", "roleId"], {
  unique: true,
})
@Entity("userroles", { schema: "restroza_dev" })
export class Userroles {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "userId", unsigned: true })
  userId: number;

  @Column("int", { name: "businessId", nullable: true, unsigned: true })
  businessId: number | null;

  @Column("int", { name: "branchId", nullable: true, unsigned: true })
  branchId: number | null;

  @Column("int", { name: "roleId", unsigned: true })
  roleId: number;

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

  @Column("timestamp", {
    name: "updated_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date | null;

  @ManyToOne(
    () => BusinessBranch,
    (businessBranch) => businessBranch.userroles,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "branchId", referencedColumnName: "id" }])
  branch: BusinessBranch;

  @ManyToOne(() => Business, (business) => business.userroles, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "businessId", referencedColumnName: "id" }])
  business: Business;

  @ManyToOne(() => Roles, (roles) => roles.userroles, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "roleId", referencedColumnName: "id" }])
  role: Roles;

  @ManyToOne(() => Users, (users) => users.userroles, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
  user: Users;
}
