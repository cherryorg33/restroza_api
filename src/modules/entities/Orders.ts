import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Deliveries } from "./Deliveries";
import { Invoices } from "./Invoices";
import { Kot } from "./Kot";
import { Orderitems } from "./Orderitems";
import { Orderpayments } from "./Orderpayments";
import { Ordertypes } from "./Ordertypes";
import { Orderstatuses } from "./Orderstatuses";

@Index("orderStatusId", ["orderStatusId"], {})
@Index("orderTypeId", ["orderTypeId"], {})
@Entity("orders", { schema: "restroza_dev" })
export class Orders {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "businessId", nullable: true, unsigned: true })
  businessId: number | null;

  @Column("int", { name: "branchId", nullable: true, unsigned: true })
  branchId: number | null;

  @Column("int", { name: "orderTypeId", unsigned: true })
  orderTypeId: number;

  @Column("int", { name: "orderStatusId", unsigned: true })
  orderStatusId: number;

  @Column("varchar", { name: "customerName", nullable: true, length: 150 })
  customerName: string | null;

  @Column("varchar", { name: "customerPhone", nullable: true, length: 20 })
  customerPhone: string | null;

  @Column("decimal", { name: "totalAmount", precision: 10, scale: 2 })
  totalAmount: string;

  @Column("decimal", {
    name: "taxAmount",
    nullable: true,
    precision: 10,
    scale: 2,
    default: () => "'0.00'",
  })
  taxAmount: string | null;

  @Column("decimal", {
    name: "discountAmount",
    nullable: true,
    precision: 10,
    scale: 2,
    default: () => "'0.00'",
  })
  discountAmount: string | null;

  @Column("decimal", { name: "finalAmount", precision: 10, scale: 2 })
  finalAmount: string;

  @Column("timestamp", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @OneToMany(() => Deliveries, (deliveries) => deliveries.order)
  deliveries: Deliveries[];

  @OneToMany(() => Invoices, (invoices) => invoices.order)
  invoices: Invoices[];

  @OneToMany(() => Kot, (kot) => kot.order)
  kots: Kot[];

  @OneToMany(() => Orderitems, (orderitems) => orderitems.order)
  orderitems: Orderitems[];

  @OneToMany(() => Orderpayments, (orderpayments) => orderpayments.order)
  orderpayments: Orderpayments[];

  @ManyToOne(() => Ordertypes, (ordertypes) => ordertypes.orders, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "orderTypeId", referencedColumnName: "id" }])
  orderType: Ordertypes;

  @ManyToOne(() => Orderstatuses, (orderstatuses) => orderstatuses.orders, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "orderStatusId", referencedColumnName: "id" }])
  orderStatus: Orderstatuses;
}
