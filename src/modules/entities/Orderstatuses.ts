import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Orders } from "./Orders";

@Index("statusCode", ["statusCode"], { unique: true })
@Entity("orderstatuses", { schema: "restroza_dev" })
export class Orderstatuses {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "statusName", length: 50 })
  statusName: string;

  @Column("varchar", { name: "statusCode", unique: true, length: 50 })
  statusCode: string;

  @Column("timestamp", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @OneToMany(() => Orders, (orders) => orders.orderStatus)
  orders: Orders[];
}
