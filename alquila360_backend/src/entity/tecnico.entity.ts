import { ChildEntity, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Ticket } from './ticket.entity';

@ChildEntity('TECNICO')
export class Tecnico extends User {
  @OneToMany(() => Ticket, (ticket) => ticket.tecnico)
  tickets: Ticket[];
}
