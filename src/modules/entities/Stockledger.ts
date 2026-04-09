import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Products } from "./Products";

@Index("productId", ["productId"], {})
@Entity("stockledger", { schema: "restroza_dev" })
export class Stockledger {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "productId", unsigned: true })
  productId: number;

  @Column("enum", {
    name: "type",
    enum: ["PURCHASE", "SALE", "ADJUSTMENT", "RETURN"],
  })
  type: "PURCHASE" | "SALE" | "ADJUSTMENT" | "RETURN";

  @Column("decimal", { name: "quantity", precision: 10, scale: 2 })
  quantity: string;

  @Column("int", { name: "referenceId", nullable: true, unsigned: true })
  referenceId: number | null;

  @Column("varchar", { name: "referenceType", nullable: true, length: 50 })
  referenceType: string | null;

  @Column("timestamp", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @ManyToOne(() => Products, (products) => products.stockledgers, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "productId", referencedColumnName: "id" }])
  product: Products;
}
