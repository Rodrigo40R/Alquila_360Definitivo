import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Propietario } from './propietario.entity';
import { Inquilino } from './inquilino.entity';
import { Garantia } from './garantia.entity';
import { Cuota } from './cuota.entity';
import { Multa } from './multa.entity'; 

@Entity({ name: 'contratos' })
export class Contrato {
  @PrimaryGeneratedColumn()
  id_contrato: number;

  @Column({ type: 'date' })
  fecha_inicio: Date;

  @Column({ type: 'date' })
  fecha_fin: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  monto_mensual: number;

  @Column()
  estado: string;

  // N:1 → un propietario puede tener muchos contratos
  @ManyToOne(
    () => Propietario,
    (propietario) => propietario.contratos,
    { nullable: false },
  )
  @JoinColumn({
    name: 'id_propietario',
    referencedColumnName: 'id_usuario',
  })
  propietario: Propietario;

  // N:1 → un inquilino puede tener muchos contratos
  @ManyToOne(
    () => Inquilino,
    (inquilino) => inquilino.contratos,
    { nullable: false },
  )
  @JoinColumn({
    name: 'id_inquilino',
    referencedColumnName: 'id_usuario',
  })
  inquilino: Inquilino;

  // 1:1 → un contrato tiene una garantía (FK en contratos: id_garantia)
  @OneToOne(() => Garantia, { nullable: true })
  @JoinColumn({
    name: 'id_garantia',
    referencedColumnName: 'id_garantia',
  })
  garantia: Garantia | null;

  // Métodos de dominio del UML
  renovar(nuevaFechaFin: Date) {
    this.fecha_fin = nuevaFechaFin;
    this.estado = 'RENOVADO';
  }

  cancelar() {
    this.estado = 'CANCELADO';
  }

  @OneToMany(() => Cuota, (cuota) => cuota.contrato)
  cuotas: Cuota[];

  @OneToMany(() => Multa, (multa) => multa.contrato)
  multas: Multa[];

}
