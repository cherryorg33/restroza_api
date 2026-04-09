import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Categories } from "./Categories";
import { Uom } from "./Uom";
import { Purchaseitems } from "./Purchaseitems";
import { Recipeitems } from "./Recipeitems";
import { Recipes } from "./Recipes";
import { Stockledger } from "./Stockledger";

@Index("categoryId", ["categoryId"], {})
@Index("uomId", ["uomId"], {})
@Entity("products", { schema: "restroza_dev" })
export class Products {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "categoryId", nullable: true, unsigned: true })
  categoryId: number | null;

  @Column("varchar", { name: "productName", length: 150 })
  productName: string;

  @Column("enum", { name: "productType", enum: ["RAW", "FINISHED", "DIRECT"] })
  productType: "RAW" | "FINISHED" | "DIRECT";

  @Column("int", { name: "uomId", nullable: true, unsigned: true })
  uomId: number | null;

  @Column("decimal", {
    name: "price",
    nullable: true,
    precision: 10,
    scale: 2,
    default: () => "'0.00'",
  })
  price: string | null;

  @Column("decimal", {
    name: "costPrice",
    nullable: true,
    precision: 10,
    scale: 2,
    default: () => "'0.00'",
  })
  costPrice: string | null;

  @Column("tinyint", {
    name: "isStockTracked",
    nullable: true,
    width: 1,
    default: () => "'1'",
  })
  isStockTracked: boolean | null;

  @Column("tinyint", {
    name: "isActive",
    nullable: true,
    width: 1,
    default: () => "'1'",
  })
  isActive: boolean | null;

  @Column("timestamp", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @ManyToOne(() => Categories, (categories) => categories.products, {
    onDelete: "SET NULL",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "categoryId", referencedColumnName: "id" }])
  category: Categories;

  @ManyToOne(() => Uom, (uom) => uom.products, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "uomId", referencedColumnName: "id" }])
  uom: Uom;

  @OneToMany(() => Purchaseitems, (purchaseitems) => purchaseitems.product)
  purchaseitems: Purchaseitems[];

  @OneToMany(() => Recipeitems, (recipeitems) => recipeitems.ingredient)
  recipeitems: Recipeitems[];

  @OneToMany(() => Recipes, (recipes) => recipes.product)
  recipes: Recipes[];

  @OneToMany(() => Stockledger, (stockledger) => stockledger.product)
  stockledgers: Stockledger[];
}
