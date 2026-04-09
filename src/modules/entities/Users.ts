import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Deliveries } from "./Deliveries";
import { Employeedetails } from "./Employeedetails";
import { Purchases } from "./Purchases";
import { Userroles } from "./Userroles";

@Index("idx_userEmail", ["userEmail"], {})
@Index("idx_userPhone", ["userPhone"], {})
@Index("userEmail", ["userEmail"], { unique: true })
@Entity("users", { schema: "restroza_dev" })
export class Users {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "userName", length: 100 })
  userName: string;

  @Column("varchar", { name: "userEmail", unique: true, length: 100 })
  userEmail: string;

  @Column("varchar", {
    name: "userPassword",
    length: 255,
    default: () => "'Restroza@123'",
  })
  userPassword: string;

  @Column("varchar", { name: "userAddress", nullable: true, length: 200 })
  userAddress: string | null;

  @Column("varchar", { name: "userPhone", nullable: true, length: 20 })
  userPhone: string | null;

  @Column("varchar", { name: "userAadhar", nullable: true, length: 20 })
  userAadhar: string | null;

  @Column("varchar", { name: "userPhoto", nullable: true, length: 255 })
  userPhoto: string | null;

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

  @OneToMany(() => Deliveries, (deliveries) => deliveries.deliveryUser)
  deliveries: Deliveries[];

  @OneToMany(() => Employeedetails, (employeedetails) => employeedetails.user)
  employeedetails: Employeedetails[];

  @OneToMany(() => Purchases, (purchases) => purchases.supplierUser)
  purchases: Purchases[];

  @OneToMany(() => Userroles, (userroles) => userroles.user)
  userroles: Userroles[];
}
