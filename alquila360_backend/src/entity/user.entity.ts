import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "usuarios" })
export class User {

  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column()
  nombre: string;

  @Column()
  correo: string;

  @Column()
  tipo_usuario: string;

  @Column({ default: false })
  verificado: boolean;

  @Column()
  estado_cuenta: string;

  login() {
    return `El usuario ${this.nombre} ha iniciado sesión.`;
  }

  verificarCuenta() {
    this.verificado = true;
    return "Cuenta verificada.";
  }
}
