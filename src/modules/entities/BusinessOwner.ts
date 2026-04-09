import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("owner_email", ["ownerEmail"], { unique: true })
@Entity("business_owner", { schema: "restroza" })
export class BusinessOwner {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "owner_name", length: 100 })
  ownerName: string;

  @Column("varchar", { name: "owner_email", unique: true, length: 100 })
  ownerEmail: string;

  @Column("varchar", { name: "owner_address", nullable: true, length: 200 })
  ownerAddress: string | null;

  @Column("varchar", { name: "owner_phone", nullable: true, length: 20 })
  ownerPhone: string | null;

  @Column("int", { name: "business_id", nullable: true })
  businessId: number | null;

  @Column("varchar", { name: "owner_password", length: 100 })
  ownerPassword: string;

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
