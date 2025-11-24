import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Contrato } from './contrato.entity';
import { Cuota } from './cuota.entity';

export type TipoMulta = 'Retraso' | 'Daño' | 'Incumplimiento';
export type EstadoMulta = 'Pendiente' | 'Pagada' | 'Anulada';

@Entity({ name: 'multas' })
export class Multa {
  @PrimaryGeneratedColumn()
  id_multa: number;

  @Column({
    type: 'enum',
    enum: ['Retraso', 'Daño', 'Incumplimiento'],
  })
  tipo: TipoMulta;

  @Column('decimal', { precision: 10, scale: 2 })
  monto: number;

  @Column({ type: 'date' })
  fecha: Date;

  @Column()
  descripcion: string;

  @Column({
    type: 'enum',
    enum: ['Pendiente', 'Pagada', 'Anulada'],
    default: 'Pendiente',
  })
  estado: EstadoMulta;

  // N:1 — un contrato tiene muchas multas
  @ManyToOne(() => Contrato, (contrato) => contrato.multas, {
    nullable: false,
  })
  @JoinColumn({
    name: 'id_contrato',
    referencedColumnName: 'id_contrato',
  })
  contrato: Contrato;

  // 1:0..1 — una multa puede estar asociada a una cuota (solo si es "Retraso")
  @OneToOne(() => Cuota, { nullable: true })
  @JoinColumn({
    name: 'id_cuota',
    referencedColumnName: 'id_cuota',
  })
  cuota: Cuota | null;

  // Métodos del UML
  registrarMulta() {
    this.estado = 'Pendiente';
  }

  anularMulta() {
    this.estado = 'Anulada';
  }
}
