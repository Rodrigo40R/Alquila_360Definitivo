// src/ticket/adapters/ticket.repo.typeorm.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Ticket } from '../../entity/ticket.entity';
import { TicketRepositoryPort } from '../ports/ticket.repo';

@Injectable()
export class TicketTypeOrmRepository implements TicketRepositoryPort {
  constructor(
    @InjectRepository(Ticket)
    private readonly repo: Repository<Ticket>,
  ) {}

  async create(ticket: Ticket): Promise<Ticket> {
    // id_ticket lo genera la BD
    return this.repo.save(ticket);
  }

  async findAll(): Promise<Ticket[]> {
    return this.repo.find({
      relations: ['inquilino', 'tecnico'], // ajusta si los nombres de relación son distintos
    });
  }

  async findOne(id: number): Promise<Ticket | null> {
    return this.repo.findOne({
      where: { id_ticket: id }, // cambia si tu PK tiene otro nombre
      relations: ['inquilino', 'tecnico'],
    });
  }

  async update(id: number, data: Partial<Ticket>): Promise<Ticket> {
    await this.repo.update(id, data);
    const updated = await this.findOne(id);
    return updated as Ticket; // el servicio valida existencia antes
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async findByInquilino(idInquilino: number): Promise<Ticket[]> {
    return this.repo.find({
      where: { inquilino: { id_usuario: idInquilino } },
      relations: ['inquilino', 'tecnico'],
    });
  }

  async findByTecnico(idTecnico: number): Promise<Ticket[]> {
    return this.repo.find({
      where: { tecnico: { id_usuario: idTecnico } },
      relations: ['inquilino', 'tecnico'],
    });
  }
}
