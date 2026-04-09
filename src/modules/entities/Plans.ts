import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Planfeatures } from "./Planfeatures";
import { Subscriptionpayments } from "./Subscriptionpayments";

@Entity("plans", { schema: "restroza_dev" })
export class Plans {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "planName", nullable: true, length: 100 })
  planName: string | null;

  @Column("decimal", { name: "price", nullable: true, precision: 10, scale: 2 })
  price: string | null;

  @Column("timestamp", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @OneToMany(() => Planfeatures, (planfeatures) => planfeatures.plan)
  planfeatures: Planfeatures[];

  @OneToMany(
    () => Subscriptionpayments,
    (subscriptionpayments) => subscriptionpayments.plan
  )
  subscriptionpayments: Subscriptionpayments[];
}
