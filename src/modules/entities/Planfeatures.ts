import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Plans } from "./Plans";
import { Features } from "./Features";

@Index("featureId", ["featureId"], {})
@Index("planId", ["planId"], {})
@Entity("planfeatures", { schema: "restroza_dev" })
export class Planfeatures {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "planId", nullable: true, unsigned: true })
  planId: number | null;

  @Column("int", { name: "featureId", nullable: true, unsigned: true })
  featureId: number | null;

  @ManyToOne(() => Plans, (plans) => plans.planfeatures, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "planId", referencedColumnName: "id" }])
  plan: Plans;

  @ManyToOne(() => Features, (features) => features.planfeatures, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "featureId", referencedColumnName: "id" }])
  feature: Features;
}
