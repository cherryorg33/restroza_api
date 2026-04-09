import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "./Products";

@Entity("uom", { schema: "restroza_dev" })
export class Uom {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "unitName", length: 50 })
  unitName: string;

  @Column("varchar", { name: "unitCode", length: 20 })
  unitCode: string;

  @Column("timestamp", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @OneToMany(() => Products, (products) => products.uom)
  products: Products[];
}
