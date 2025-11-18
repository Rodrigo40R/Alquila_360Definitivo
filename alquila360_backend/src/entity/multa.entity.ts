import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Contrato } from './contrato.entity';
import { User } from './user.entity';

export enum TipoMulta {
  RETRASO = 'retraso',
  DANO = 'daño',
  INCUMPLIMIENTO = 'incumplimiento'
}

export enum EstadoMulta {
  PENDIENTE = 'pendiente',
  PAGADA = 'pagada',
  ANULADA = 'anulada'
}

@Entity()
export class Multa {
  @PrimaryGeneratedColumn()
  id_multa: number;

  @Column({
    type: 'enum',
    enum: TipoMulta,
  })
  tipo: TipoMulta;

  @Column('decimal', { precision: 10, scale: 2 })
  monto: number;

  @Column()
  fecha: Date;

  @Column('text')
  descripcion: string;

  @Column({
    type: 'enum',
    enum: EstadoMulta,
    default: EstadoMulta.PENDIENTE
  })
  estado: EstadoMulta;

  @ManyToOne(() => Contrato, contrato => contrato.multas)
  contrato: Contrato;

  @ManyToOne(() => User, user => user.multas)
  inquilino: User;

  registrarMulta(): void {
    this.estado = EstadoMulta.PENDIENTE;
    this.fecha = new Date();
  }

  anularMulta(): void {
    this.estado = EstadoMulta.ANULADA;
  }

  pagarMulta(): void {
    this.estado = EstadoMulta.PAGADA;
  }
}
