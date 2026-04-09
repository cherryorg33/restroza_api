import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Orders } from "./Orders";

@Index("orderId", ["orderId"], {})
@Entity("orderitems", { schema: "restroza_dev" })
export class Orderitems {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "orderId", nullable: true, unsigned: true })
  orderId: number | null;

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

  @ManyToOne(() => Orders, (orders) => orders.orderitems, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "orderId", referencedColumnName: "id" }])
  order: Orders;
}
