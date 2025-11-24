import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Administrador } from './administrador.entity';

@Entity({ name: 'reportes' })
export class Reporte {
  @PrimaryGeneratedColumn()
  id_reporte: number;

  @Column()
  tipo: string;

  @Column({ type: 'date' })
  fecha: Date;

  @ManyToOne(
    () => Administrador,
    (admin) => admin.reportes,
    { nullable: false },
  )
  @JoinColumn({
    name: 'id_administrador',
    referencedColumnName: 'id_usuario',
  })
  administrador: Administrador;

  // Método de dominio del UML (simulación)
  generarPDF(): string {
    return `Reporte ${this.id_reporte} (${this.tipo}) generado en PDF`;
  }
}
