import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Userroles } from "./Userroles";

@Index("unique_role_name", ["roleName"], { unique: true })
@Entity("roles", { schema: "restroza_dev" })
export class Roles {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "roleName", unique: true, length: 100 })
  roleName: string;

  @Column("varchar", { name: "roleDescription", length: 100 })
  roleDescription: string;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("datetime", {
    name: "updated_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  @OneToMany(() => Userroles, (userroles) => userroles.role)
  userroles: Userroles[];
}
