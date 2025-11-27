// src/evaluacion/evaluacion.service.ts
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateEvaluacionDto } from './dto/create-evaluacion.dto';
import { UpdateEvaluacionDto } from './dto/update-evaluacion.dto';
import { Evaluacion } from '../entity/evaluacion.entity';

import { EVALUACION_REPOSITORY } from './ports/evaluacion.repo';
import type { EvaluacionRepositoryPort } from './ports/evaluacion.repo';

import { TicketService } from '../ticket/ticket.service';
import { Ticket } from '../entity/ticket.entity';

@Injectable()
export class EvaluacionService {
  constructor(
    @Inject(EVALUACION_REPOSITORY)
    private readonly evaluacionRepo: EvaluacionRepositoryPort,

    // ✅ usamos el servicio de ticket, no el repositorio directamente
    private readonly ticketService: TicketService,
  ) {}

  async create(dto: CreateEvaluacionDto): Promise<Evaluacion> {
    const ticket = await this.ticketService.findOne(dto.id_ticket);
    // findOne ya lanza NotFoundException si el ticket no existe

    const existente = await this.evaluacionRepo.findByTicket(dto.id_ticket);
    if (existente) {
      throw new BadRequestException(
        `El ticket ${dto.id_ticket} ya tiene una evaluación`,
      );
    }

    const evaluacion = new Evaluacion();
    evaluacion.puntuacion = dto.puntuacion;
    evaluacion.comentario = dto.comentario;
    evaluacion.ticket = ticket as Ticket;

    return this.evaluacionRepo.create(evaluacion);
  }

  async findAll(): Promise<Evaluacion[]> {
    return this.evaluacionRepo.findAll();
  }

  async findOne(id: number): Promise<Evaluacion> {
    const ev = await this.evaluacionRepo.findOne(id);
    if (!ev) {
      throw new NotFoundException(`Evaluación con id ${id} no encontrada`);
    }
    return ev;
  }

  async update(
    id: number,
    dto: UpdateEvaluacionDto,
  ): Promise<Evaluacion> {
    await this.findOne(id); // valida que exista

    const partial: Partial<Evaluacion> = {};
    if (dto.puntuacion !== undefined) partial.puntuacion = dto.puntuacion;
    if (dto.comentario !== undefined) partial.comentario = dto.comentario;

    return this.evaluacionRepo.update(id, partial);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    return this.evaluacionRepo.remove(id);
  }

  async findByTicket(idTicket: number): Promise<Evaluacion> {
    // valida que el ticket exista
    await this.ticketService.findOne(idTicket);

    const ev = await this.evaluacionRepo.findByTicket(idTicket);
    if (!ev) {
      throw new NotFoundException(
        `No hay evaluación para el ticket ${idTicket}`,
      );
    }
    return ev;
  }
}
