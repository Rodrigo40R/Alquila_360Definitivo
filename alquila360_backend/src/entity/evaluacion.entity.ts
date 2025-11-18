import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Propiedad } from './propiedad.entity';

@Entity()
export class Evaluacion {
  @PrimaryGeneratedColumn()
  id_evaluacion: number;

  @Column('int')
  puntuacion: number;

  @Column('text')
  comentario: string;

  @Column()
  fecha: Date;

  @ManyToOne(() => User, user => user.evaluaciones_recibidas_inquilino)
  inquilino_evaluado: User;

  @ManyToOne(() => User, user => user.evaluaciones_recibidas_propietario)
  propietario_evaluado: User;

  @ManyToOne(() => User, user => user.evaluaciones_hechas_inquilino)
  evaluador_inquilino: User;

  @ManyToOne(() => User, user => user.evaluaciones_hechas_propietario)
  evaluador_propietario: User;

  @ManyToOne(() => Propiedad, propiedad => propiedad.evaluaciones)
  propiedad: Propiedad;
}