import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Cuota } from './cuota.entity';

export enum MetodoPago {
  TARJETA = 'tarjeta',
  TRANSFERENCIA = 'transferencia',
  EFECTIVO = 'efectivo'
}

@Entity()
export class Pago {
  @PrimaryGeneratedColumn()
  id_pago: number;

  @Column()
  fecha_pago: Date;

  @Column({
    type: 'enum',
    enum: MetodoPago
  })
  metodo_pago: MetodoPago;

  @Column('decimal', { precision: 10, scale: 2 })
  monto: number;

  @OneToOne(() => Cuota, cuota => cuota.pago)
  cuota: Cuota;

  generarRecibo(): string {
    return `Recibo de pago #${this.id_pago}\nMonto: $${this.monto}\nFecha: ${this.fecha_pago}\nMétodo: ${this.metodo_pago}`;
  }
}
