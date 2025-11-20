import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Cuota } from './cuota.entity';

@Entity({ name: 'pagos' })
export class Pago {
  @PrimaryGeneratedColumn()
  id_pago: number;

  @Column({ type: 'date' })
  fecha_pago: Date;

  @Column()
  metodo_pago: string; // Ej: 'EFECTIVO', 'TARJETA', 'TRANSFERENCIA'

  @Column('decimal', { precision: 10, scale: 2 })
  monto: number;

  // 1:1 → el pago siempre pertenece a una cuota
  @OneToOne(() => Cuota, (cuota) => cuota.pago, { nullable: false })
  @JoinColumn({
    name: 'id_cuota',
    referencedColumnName: 'id_cuota',
  })
  cuota: Cuota;

  // Método del UML
  generarRecibo(): string {
    return `Recibo de pago ${this.id_pago} por monto ${this.monto}`;
  }
}
