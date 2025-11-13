import { ChildEntity } from 'typeorm';
import { User } from './user.entity';

@ChildEntity('ADMINISTRADOR')
export class Administrador extends User {
}
