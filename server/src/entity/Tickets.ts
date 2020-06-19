import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import UserEntity from "./Users";

@Entity("ticket")
class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => UserEntity, (id_user) => id_user.id, {
    eager: true,
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "id_user" })
  id_user: UserEntity;

  @Column()
  ticket_pedido: boolean;
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: string;
}

export default Ticket;
