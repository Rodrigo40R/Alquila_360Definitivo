import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Contrato } from './contrato.entity';

@Entity({ name: 'garantias' })
export class Garantia {
  @PrimaryGeneratedColumn()
  id_garantia: number;

  @Column('decimal', { precision: 10, scale: 2 })
  monto: number;

  @Column()
  descripcion: string;

  // Relación 1:1 (lado NO dueño, el dueño es Contrato)
  @OneToOne(() => Contrato, (contrato) => contrato.garantia)
  contrato: Contrato;

  // Método de dominio del UML
  usarParaDanos(montoDano: number) {
    const nuevoMonto = Number(this.monto) - Number(montoDano);
    this.monto = nuevoMonto < 0 ? 0 : nuevoMonto;
  }
}
