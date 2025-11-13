import { ChildEntity } from 'typeorm';
import { User } from './user.entity';

@ChildEntity('INQUILINO')
export class Inquilino extends User {
}
