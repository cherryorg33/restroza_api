import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Orders } from "./Orders";

@Index("typeCode", ["typeCode"], { unique: true })
@Entity("ordertypes", { schema: "restroza_dev" })
export class Ordertypes {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "typeName", length: 50 })
  typeName: string;

  @Column("varchar", { name: "typeCode", unique: true, length: 50 })
  typeCode: string;

  @Column("timestamp", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @OneToMany(() => Orders, (orders) => orders.orderType)
  orders: Orders[];
}
