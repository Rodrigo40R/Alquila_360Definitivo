import { ChildEntity } from 'typeorm';
import { User } from './user.entity';

@ChildEntity('TECNICO')
export class Tecnico extends User {
}
