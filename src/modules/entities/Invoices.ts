import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Invoiceitems } from "./Invoiceitems";
import { Orders } from "./Orders";

@Index("invoiceNumber", ["invoiceNumber"], { unique: true })
@Index("orderId", ["orderId"], {})
@Entity("invoices", { schema: "restroza_dev" })
export class Invoices {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "orderId", unsigned: true })
  orderId: number;

  @Column("varchar", {
    name: "invoiceNumber",
    nullable: true,
    unique: true,
    length: 100,
  })
  invoiceNumber: string | null;

  @Column("decimal", {
    name: "totalAmount",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  totalAmount: string | null;

  @Column("decimal", {
    name: "taxAmount",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  taxAmount: string | null;

  @Column("decimal", {
    name: "discountAmount",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  discountAmount: string | null;

  @Column("decimal", {
    name: "finalAmount",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  finalAmount: string | null;

  @Column("timestamp", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @OneToMany(() => Invoiceitems, (invoiceitems) => invoiceitems.invoice)
  invoiceitems: Invoiceitems[];

  @ManyToOne(() => Orders, (orders) => orders.invoices, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "orderId", referencedColumnName: "id" }])
  order: Orders;
}
