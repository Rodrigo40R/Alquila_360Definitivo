// src/ticket/ports/ticket.repo.ts
import { Ticket } from '../../entity/ticket.entity';

// 🔹 Token para inyección de dependencias
export const TICKET_REPOSITORY = 'TICKET_REPOSITORY';

// 🔹 Puerto del repositorio de Ticket
export interface TicketRepositoryPort {
  create(ticket: Ticket): Promise<Ticket>;
  findAll(): Promise<Ticket[]>;
  findOne(id: number): Promise<Ticket | null>;
  update(id: number, data: Partial<Ticket>): Promise<Ticket>;
  remove(id: number): Promise<void>;
  findByInquilino(idInquilino: number): Promise<Ticket[]>;
  findByTecnico(idTecnico: number): Promise<Ticket[]>;
}
