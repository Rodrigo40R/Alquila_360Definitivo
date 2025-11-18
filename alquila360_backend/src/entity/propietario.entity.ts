import { ChildEntity, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Propiedad } from './propiedad.entity';

@ChildEntity('PROPIETARIO')
export class Propietario extends User {
  @OneToMany(() => Propiedad, (propiedad) => propiedad.propietario)
  propiedades: Propiedad[];
}
