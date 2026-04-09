import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Businessfeatures } from "./Businessfeatures";
import { Planfeatures } from "./Planfeatures";

@Index("featureCode", ["featureCode"], { unique: true })
@Index("featureName", ["featureName"], { unique: true })
@Entity("features", { schema: "restroza_dev" })
export class Features {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "featureName", unique: true, length: 100 })
  featureName: string;

  @Column("varchar", { name: "featureCode", unique: true, length: 50 })
  featureCode: string;

  @Column("varchar", { name: "description", nullable: true, length: 255 })
  description: string | null;

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

  @Column("timestamp", {
    name: "updated_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date | null;

  @OneToMany(
    () => Businessfeatures,
    (businessfeatures) => businessfeatures.feature
  )
  businessfeatures: Businessfeatures[];

  @OneToMany(() => Planfeatures, (planfeatures) => planfeatures.feature)
  planfeatures: Planfeatures[];
}
