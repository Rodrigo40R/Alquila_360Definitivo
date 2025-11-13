import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Inquilino } from './inquilino.entity';
import { Tecnico } from './tecnico.entity';

@Entity({ name: 'tickets' })
export class Ticket {
  @PrimaryGeneratedColumn()
  id_ticket: number;

  @Column()
  descripcion: string;

  @Column()
  prioridad: string;

  @Column()
  estado: string;

  @Column()
  subestado: string;

  // N:1 → un inquilino puede tener muchos tickets
  @ManyToOne(() => Inquilino, (inquilino) => inquilino.tickets, {
    nullable: false,
  })
  @JoinColumn({
    name: 'id_inquilino',
    referencedColumnName: 'id_usuario', // PK de Inquilino (User)
  })
  inquilino: Inquilino;

  // N:1 → un técnico puede atender muchos tickets
  // Lo dejamos nullable porque al crear el ticket quizá aún no se asignó técnico
  @ManyToOne(() => Tecnico, (tecnico) => tecnico.tickets, {
    nullable: true,
  })
  @JoinColumn({
    name: 'id_tecnico',
    referencedColumnName: 'id_usuario', // PK de Técnico (User)
  })
  tecnico: Tecnico | null;

  // Método de dominio del UML
  actualizarEstado(nuevoEstado: string, nuevoSubestado?: string) {
    this.estado = nuevoEstado;
    if (nuevoSubestado !== undefined) {
      this.subestado = nuevoSubestado;
    }
  }
}
