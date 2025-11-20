import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Ticket } from './ticket.entity';

@Entity({ name: 'evaluaciones' })
export class Evaluacion {
  @PrimaryGeneratedColumn()
  id_evaluacion: number;

  @Column()
  puntuacion: number;

  @Column()
  comentario: string;

  // 1:1 → una evaluación pertenece a un ticket
  @OneToOne(() => Ticket, (ticket) => ticket.evaluacion, { nullable: false })
  @JoinColumn({
    name: 'id_ticket',
    referencedColumnName: 'id_ticket',
  })
  ticket: Ticket;
}
