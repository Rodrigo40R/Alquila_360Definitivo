import { ChildEntity, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Propiedad } from './propiedad.entity';
import { Contrato } from './contrato.entity';

@ChildEntity('PROPIETARIO')
export class Propietario extends User {
  @OneToMany(() => Propiedad, (propiedad) => propiedad.propietario)
  propiedades: Propiedad[];

  @OneToMany(() => Contrato, (contrato) => contrato.propietario)
  contratos: Contrato[];
}
