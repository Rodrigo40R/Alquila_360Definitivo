import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Contrato } from './contrato.entity';
import { Pago } from './pago.entity';

@Entity({ name: 'cuotas' })
export class Cuota {
  @PrimaryGeneratedColumn()
  id_cuota: number;

  @Column('decimal', { precision: 10, scale: 2 })
  monto: number;

  @Column({ type: 'date' })
  fecha_vencimiento: Date;

  @Column()
  estado: string; // Ej: 'PENDIENTE', 'PAGADA', 'VENCIDA'

  // N:1 → un contrato tiene muchas cuotas
  @ManyToOne(() => Contrato, (contrato) => contrato.cuotas, {
    nullable: false,
  })
  @JoinColumn({
    name: 'id_contrato',
    referencedColumnName: 'id_contrato',
  })
  contrato: Contrato;

  // 1:1 → una cuota puede tener un pago que la salda
  @OneToOne(() => Pago, (pago) => pago.cuota, { nullable: true })
  pago: Pago | null;
}
