import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("email", ["email"], { unique: true })
@Entity("business", { schema: "restroza" })
export class Business {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "business_name", length: 100 })
  businessName: string;

  @Column("varchar", { name: "business_address", length: 100 })
  businessAddress: string;

  @Column("varchar", { name: "email", unique: true, length: 100 })
  email: string;

  @Column("varchar", { name: "password", length: 100 })
  password: string;

  @Column("varchar", { name: "business_logo", nullable: true, length: 255 })
  businessLogo: string | null;

  @Column("enum", { name: "business_type", enum: ["Restaurant", "Retail"] })
  businessType: "Restaurant" | "Retail";

  @Column("varchar", { name: "phone", nullable: true, length: 20 })
  phone: string | null;

  @Column("varchar", { name: "gst_number", nullable: true, length: 50 })
  gstNumber: string | null;

  @Column("datetime", {
    name: "created_at",
    nullable: true,
    default: () => "'now()'",
  })
  createdAt: Date | null;

  @Column("datetime", {
    name: "updated_at",
    nullable: true,
    default: () => "'now()'",
  })
  updatedAt: Date | null;
}
