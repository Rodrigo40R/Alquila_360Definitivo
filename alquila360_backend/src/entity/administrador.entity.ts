import { ChildEntity, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Reporte } from './reporte.entity';

@ChildEntity('ADMINISTRADOR')
export class Administrador extends User {
  @OneToMany(() => Reporte, (reporte) => reporte.administrador)
  reportes: Reporte[];
}
