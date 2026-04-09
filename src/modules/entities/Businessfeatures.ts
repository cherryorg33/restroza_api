import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Business } from "./Business";
import { Features } from "./Features";

@Index("fk_businessFeatures_feature", ["featureId"], {})
@Index("uniq_business_feature", ["businessId", "featureId"], { unique: true })
@Entity("businessfeatures", { schema: "restroza_dev" })
export class Businessfeatures {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "businessId", unsigned: true })
  businessId: number;

  @Column("int", { name: "featureId", unsigned: true })
  featureId: number;

  @Column("tinyint", {
    name: "isEnabled",
    nullable: true,
    width: 1,
    default: () => "'1'",
  })
  isEnabled: boolean | null;

  @Column("date", { name: "validFrom", nullable: true })
  validFrom: string | null;

  @Column("date", { name: "validTo", nullable: true })
  validTo: string | null;

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

  @ManyToOne(() => Business, (business) => business.businessfeatures, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "businessId", referencedColumnName: "id" }])
  business: Business;

  @ManyToOne(() => Features, (features) => features.businessfeatures, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "featureId", referencedColumnName: "id" }])
  feature: Features;
}
