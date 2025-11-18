import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Contrato } from './contrato.entity';
import { Pago } from './pago.entity';

export enum EstadoCuota {
  PENDIENTE = 'pendiente',
  PAGADA = 'pagada',
  VENCIDA = 'vencida',
  MORA = 'mora'
}

@Entity()
export class Cuota {
  @PrimaryGeneratedColumn()
  id_cuota: number;

  @Column('decimal', { precision: 10, scale: 2 })
  monto: number;

  @Column()
  fecha_vencimiento: Date;

  @Column({
    type: 'enum',
    enum: EstadoCuota,
    default: EstadoCuota.PENDIENTE
  })
  estado: EstadoCuota;

  @ManyToOne(() => Contrato, contrato => contrato.cuotas)
  contrato: Contrato;

  @OneToOne(() => Pago, pago => pago.cuota, { nullable: true })
  @JoinColumn()
  pago: Pago;
}
