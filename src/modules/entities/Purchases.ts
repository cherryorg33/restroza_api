import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Purchaseitems } from "./Purchaseitems";
import { Users } from "./Users";

@Index("supplierUserId", ["supplierUserId"], {})
@Entity("purchases", { schema: "restroza_dev" })
export class Purchases {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "supplierUserId", unsigned: true })
  supplierUserId: number;

  @Column("decimal", {
    name: "totalAmount",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  totalAmount: string | null;

  @Column("datetime", {
    name: "purchaseDate",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  purchaseDate: Date | null;

  @OneToMany(() => Purchaseitems, (purchaseitems) => purchaseitems.purchase)
  purchaseitems: Purchaseitems[];

  @ManyToOne(() => Users, (users) => users.purchases, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "supplierUserId", referencedColumnName: "id" }])
  supplierUser: Users;
}
