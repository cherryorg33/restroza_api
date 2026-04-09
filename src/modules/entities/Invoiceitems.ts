import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Invoices } from "./Invoices";

@Index("invoiceId", ["invoiceId"], {})
@Entity("invoiceitems", { schema: "restroza_dev" })
export class Invoiceitems {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "invoiceId", nullable: true, unsigned: true })
  invoiceId: number | null;

  @Column("int", { name: "productId", nullable: true, unsigned: true })
  productId: number | null;

  @Column("decimal", {
    name: "quantity",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  quantity: string | null;

  @Column("decimal", { name: "price", nullable: true, precision: 10, scale: 2 })
  price: string | null;

  @Column("decimal", { name: "total", nullable: true, precision: 10, scale: 2 })
  total: string | null;

  @ManyToOne(() => Invoices, (invoices) => invoices.invoiceitems, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "invoiceId", referencedColumnName: "id" }])
  invoice: Invoices;
}
