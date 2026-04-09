import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("paymenttype", { schema: "restroza" })
export class Paymenttype {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("enum", {
    name: "payment_frequency",
    enum: ["Daily", "Weekly", "BiWeekly", "Monthly"],
  })
  paymentFrequency: "Daily" | "Weekly" | "BiWeekly" | "Monthly";

  @Column("varchar", { name: "description", nullable: true, length: 200 })
  description: string | null;

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
