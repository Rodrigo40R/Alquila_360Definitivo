import { ChildEntity, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Ticket } from './ticket.entity';

@ChildEntity('INQUILINO')
export class Inquilino extends User {
  @OneToMany(() => Ticket, (ticket) => ticket.inquilino)
  tickets: Ticket[];
}
