import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";

@Entity("tipo_usuario")
class UserTypes {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column({ unique: true, length: 50 })
  nombre: string;

  @BeforeInsert()
  clearStringSpaces() {
    this.nombre = this.nombre.replace(/ /g, "_");
    this.nombre = this.nombre.toLowerCase();
  }
}

export default UserTypes;
