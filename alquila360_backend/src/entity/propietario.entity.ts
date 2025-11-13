import { ChildEntity } from 'typeorm';
import { User, TipoUsuario } from './user.entity';

@ChildEntity('PROPIETARIO')
export class Propietario extends User {
  // Aquí podrías agregar campos propios,
  // por ahora hereda todo de User.
  // Ejemplo futuro:
  // @Column() ruc: string;
}