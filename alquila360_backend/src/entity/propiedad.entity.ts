import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Propietario } from './propietario.entity';

@Entity({ name: 'propiedades' })
export class Propiedad {
  @PrimaryGeneratedColumn()
  id_propiedad: number;

  @Column()
  direccion: string;

  @Column()
  tipo: string;

  @Column()
  estado: string;

  @ManyToOne(() => Propietario, (propietario) => propietario.propiedades, {
    nullable: false,
  })
  @JoinColumn({
    name: 'id_propietario',
    referencedColumnName: 'id_usuario',
  })
  propietario: Propietario;
}
