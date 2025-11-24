// src/evaluacion/adapters/evaluacion.repo.typeorm.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Evaluacion } from '../../entity/evaluacion.entity';
import { EvaluacionRepositoryPort } from '../ports/evaluacion.repo';

@Injectable()
export class EvaluacionTypeOrmRepository implements EvaluacionRepositoryPort {
  constructor(
    @InjectRepository(Evaluacion)
    private readonly repo: Repository<Evaluacion>,
  ) {}

  async create(evaluacion: Evaluacion): Promise<Evaluacion> {
    // id_evaluacion lo genera la BD
    return this.repo.save(evaluacion);
  }

  async findAll(): Promise<Evaluacion[]> {
    return this.repo.find({
      relations: ['ticket'], // ajusta si el nombre de la relación es distinto
    });
  }

  async findOne(id: number): Promise<Evaluacion | null> {
    return this.repo.findOne({
      where: { id_evaluacion: id }, // cambia si tu PK tiene otro nombre
      relations: ['ticket'],
    });
  }

  async update(
    id: number,
    data: Partial<Evaluacion>,
  ): Promise<Evaluacion> {
    await this.repo.update(id, data);
    const updated = await this.findOne(id);
    return updated as Evaluacion; // el servicio valida la existencia antes
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async findByTicket(idTicket: number): Promise<Evaluacion | null> {
    return this.repo.findOne({
      where: { ticket: { id_ticket: idTicket } },
      relations: ['ticket'],
    });
  }
}
