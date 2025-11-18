import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  TableInheritance,
} from 'typeorm';

export type TipoUsuario =
  | 'PROPIETARIO'
  | 'INQUILINO'
  | 'TECNICO'
  | 'ADMINISTRADOR';

@Entity({ name: 'usuarios' })
@TableInheritance({ column: { type: 'varchar', name: 'tipo_usuario' } })
export class User {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column()
  nombre: string;

  @Column()
  correo: string;

  @Column({ name: 'tipo_usuario' })
  tipo_usuario: TipoUsuario;

  @Column({ default: false })
  verificado: boolean;

  @Column()
  estado_cuenta: string;

  // Métodos de dominio
  login() {
    return `El usuario ${this.nombre} ha iniciado sesión.`;
  }

  verificarCuenta() {
    this.verificado = true;
    return 'Cuenta verificada.';
  }
}
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;
}
