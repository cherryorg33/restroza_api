import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("userrole", { schema: "restroza" })
export class Userrole {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "user_id", nullable: true })
  userId: number | null;

  @Column("int", { name: "role_id", nullable: true })
  roleId: number | null;

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
