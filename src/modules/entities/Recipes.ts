import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Recipeitems } from "./Recipeitems";
import { Products } from "./Products";

@Index("productId", ["productId"], {})
@Entity("recipes", { schema: "restroza_dev" })
export class Recipes {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "productId", unsigned: true })
  productId: number;

  @OneToMany(() => Recipeitems, (recipeitems) => recipeitems.recipe)
  recipeitems: Recipeitems[];

  @ManyToOne(() => Products, (products) => products.recipes, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "productId", referencedColumnName: "id" }])
  product: Products;
}
