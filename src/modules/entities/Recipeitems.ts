import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Recipes } from "./Recipes";
import { Products } from "./Products";

@Index("ingredientId", ["ingredientId"], {})
@Index("recipeId", ["recipeId"], {})
@Entity("recipeitems", { schema: "restroza_dev" })
export class Recipeitems {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "recipeId", nullable: true, unsigned: true })
  recipeId: number | null;

  @Column("int", { name: "ingredientId", nullable: true, unsigned: true })
  ingredientId: number | null;

  @Column("decimal", {
    name: "quantity",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  quantity: string | null;

  @ManyToOne(() => Recipes, (recipes) => recipes.recipeitems, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "recipeId", referencedColumnName: "id" }])
  recipe: Recipes;

  @ManyToOne(() => Products, (products) => products.recipeitems, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "ingredientId", referencedColumnName: "id" }])
  ingredient: Products;
}
