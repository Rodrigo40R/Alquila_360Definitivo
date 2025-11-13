import { Ticket } from '../../entity/ticket.entity';

export abstract class TicketRepositoryPort {
  abstract create(ticket: Ticket): Promise<Ticket>;
  abstract findAll(): Promise<Ticket[]>;
  abstract findOne(id: number): Promise<Ticket | null>;
  abstract update(id: number, data: Partial<Ticket>): Promise<Ticket>;
  abstract remove(id: number): Promise<void>;
  abstract findByInquilino(idInquilino: number): Promise<Ticket[]>;
  abstract findByTecnico(idTecnico: number): Promise<Ticket[]>;
}
