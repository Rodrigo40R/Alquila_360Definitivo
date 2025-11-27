import { Injectable } from '@nestjs/common';
import { TicketRepositoryPort } from '../ports/ticket.repo';
import { Ticket } from '../../entity/ticket.entity';

@Injectable()
export class InMemoryTicketRepository implements TicketRepositoryPort {
  private tickets: Ticket[] = [];
  private currentId = 1;

  async create(ticket: Ticket): Promise<Ticket> {
    ticket.id_ticket = this.currentId++;
    this.tickets.push(ticket);
    return ticket;
  }

  async findAll(): Promise<Ticket[]> {
    return this.tickets;
  }

  async findOne(id: number): Promise<Ticket | null> {
    const ticket = this.tickets.find((t) => t.id_ticket === id);
    return ticket ?? null;
  }

  async update(id: number, data: Partial<Ticket>): Promise<Ticket> {
    const ticket = await this.findOne(id);
    if (!ticket) {
      throw new Error(`Ticket con id ${id} no encontrado`);
    }

    if (data.descripcion !== undefined) ticket.descripcion = data.descripcion;
    if (data.prioridad !== undefined) ticket.prioridad = data.prioridad;
    if (data.estado !== undefined) ticket.estado = data.estado;
    if (data.subestado !== undefined) ticket.subestado = data.subestado;
    if (data.tecnico !== undefined) ticket.tecnico = data.tecnico;
    if (data.inquilino !== undefined) ticket.inquilino = data.inquilino;

    return ticket;
  }

  async remove(id: number): Promise<void> {
    this.tickets = this.tickets.filter((t) => t.id_ticket !== id);
  }

  async findByInquilino(idInquilino: number): Promise<Ticket[]> {
    return this.tickets.filter(
      (t) => t.inquilino && t.inquilino.id_usuario === idInquilino,
    );
  }

  async findByTecnico(idTecnico: number): Promise<Ticket[]> {
    return this.tickets.filter(
      (t) => t.tecnico && t.tecnico.id_usuario === idTecnico,
    );
  }
}
