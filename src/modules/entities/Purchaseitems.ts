import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Purchases } from "./Purchases";
import { Products } from "./Products";

@Index("productId", ["productId"], {})
@Index("purchaseId", ["purchaseId"], {})
@Entity("purchaseitems", { schema: "restroza_dev" })
export class Purchaseitems {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "purchaseId", nullable: true, unsigned: true })
  purchaseId: number | null;

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

  @ManyToOne(() => Purchases, (purchases) => purchases.purchaseitems, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "purchaseId", referencedColumnName: "id" }])
  purchase: Purchases;

  @ManyToOne(() => Products, (products) => products.purchaseitems, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "productId", referencedColumnName: "id" }])
  product: Products;
}
