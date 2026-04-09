import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Businessfeatures } from "./Businessfeatures";
import { Subscriptionpayments } from "./Subscriptionpayments";
import { Userroles } from "./Userroles";

@Index("email", ["email"], { unique: true })
@Entity("business", { schema: "restroza_dev" })
export class Business {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "businessName", length: 100 })
  businessName: string;

  @Column("varchar", { name: "businessAddress", length: 100 })
  businessAddress: string;

  @Column("varchar", { name: "email", unique: true, length: 100 })
  email: string;

  @Column("varchar", { name: "password", length: 100 })
  password: string;

  @Column("varchar", { name: "businessLogo", nullable: true, length: 255 })
  businessLogo: string | null;

  @Column("enum", { name: "businessType", enum: ["Restaurant", "Retail"] })
  businessType: "Restaurant" | "Retail";

  @Column("varchar", { name: "phone", nullable: true, length: 20 })
  phone: string | null;

  @Column("varchar", { name: "gstNumber", nullable: true, length: 50 })
  gstNumber: string | null;

  @Column("datetime", {
    name: "createdAt",
    nullable: true,
    default: () => "'now()'",
  })
  createdAt: Date | null;

  @Column("datetime", {
    name: "updatedAt",
    nullable: true,
    default: () => "'now()'",
  })
  updatedAt: Date | null;

  @OneToMany(
    () => Businessfeatures,
    (businessfeatures) => businessfeatures.business
  )
  businessfeatures: Businessfeatures[];

  @OneToMany(
    () => Subscriptionpayments,
    (subscriptionpayments) => subscriptionpayments.business
  )
  subscriptionpayments: Subscriptionpayments[];

  @OneToMany(() => Userroles, (userroles) => userroles.business)
  userroles: Userroles[];
}
