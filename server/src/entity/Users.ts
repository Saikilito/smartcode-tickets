import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, ManyToOne, JoinColumn } from "typeorm";
import UserTypes from "./UserTypes";

import bcrypt from "bcryptjs";

@Entity("usuarios")
class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 100 })
  mail: string;
  @Column({ length: 50 })
  nombre: string;
  @Column()
  pass: string;
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: string;
  @ManyToOne((type) => UserTypes, (usertype) => usertype.id, { eager: true })
  @JoinColumn({ name: "id_tipouser" })
  id_tipouser: UserTypes;

  @BeforeInsert()
  cryptPassword() {
    const salt = bcrypt.genSaltSync(10);
    this.pass = bcrypt.hashSync(this.pass, salt);
  }

  @BeforeInsert()
  clearStringSpaces() {
    this.nombre = this.nombre.replace(/ /g, "_");
    this.nombre = this.nombre.toLowerCase();
    this.mail = this.mail.replace(/ /g, "");
  }
}

export default Users;
