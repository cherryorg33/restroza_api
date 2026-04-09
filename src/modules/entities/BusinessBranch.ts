import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Userroles } from "./Userroles";

@Index("branchEmail", ["branchEmail"], { unique: true })
@Index("idx_branchEmail", ["branchEmail"], {})
@Index("idx_branchPhone", ["branchPhone"], {})
@Entity("business_branch", { schema: "restroza_dev" })
export class BusinessBranch {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "branchName", length: 100 })
  branchName: string;

  @Column("varchar", { name: "branchAddress", length: 200 })
  branchAddress: string;

  @Column("varchar", { name: "branchEmail", unique: true, length: 100 })
  branchEmail: string;

  @Column("varchar", { name: "branchPassword", length: 255 })
  branchPassword: string;

  @Column("varchar", { name: "branchPhone", nullable: true, length: 20 })
  branchPhone: string | null;

  @Column("decimal", {
    name: "branchTax",
    nullable: true,
    precision: 5,
    scale: 2,
    default: () => "'0.00'",
  })
  branchTax: string | null;

  @Column("tinyint", { name: "isActive", width: 1, default: () => "'1'" })
  isActive: boolean;

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

  @OneToMany(() => Userroles, (userroles) => userroles.branch)
  userroles: Userroles[];
}
