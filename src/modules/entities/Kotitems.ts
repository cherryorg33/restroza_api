import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Kot } from "./Kot";

@Index("kotId", ["kotId"], {})
@Entity("kotitems", { schema: "restroza_dev" })
export class Kotitems {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "kotId", nullable: true, unsigned: true })
  kotId: number | null;

  @Column("int", { name: "productId", nullable: true, unsigned: true })
  productId: number | null;

  @Column("decimal", {
    name: "quantity",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  quantity: string | null;

  @ManyToOne(() => Kot, (kot) => kot.kotitems, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "kotId", referencedColumnName: "id" }])
  kot: Kot;
}
