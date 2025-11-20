import { Injectable } from '@nestjs/common';
import { EvaluacionRepositoryPort } from '../ports/evaluacion.repo';
import { Evaluacion } from '../../entity/evaluacion.entity';

@Injectable()
export class InMemoryEvaluacionRepository implements EvaluacionRepositoryPort {
  private evaluaciones: Evaluacion[] = [];
  private currentId = 1;

  async create(evaluacion: Evaluacion): Promise<Evaluacion> {
    evaluacion.id_evaluacion = this.currentId++;
    this.evaluaciones.push(evaluacion);
    return evaluacion;
  }

  async findAll(): Promise<Evaluacion[]> {
    return this.evaluaciones;
  }

  async findOne(id: number): Promise<Evaluacion | null> {
    const ev = this.evaluaciones.find((e) => e.id_evaluacion === id);
    return ev ?? null;
  }

  async update(
    id: number,
    data: Partial<Evaluacion>,
  ): Promise<Evaluacion> {
    const ev = await this.findOne(id);
    if (!ev) {
      throw new Error(`Evaluación con id ${id} no encontrada`);
    }

    if (data.puntuacion !== undefined) ev.puntuacion = data.puntuacion;
    if (data.comentario !== undefined) ev.comentario = data.comentario;
    if (data.ticket !== undefined) ev.ticket = data.ticket;

    return ev;
  }

  async remove(id: number): Promise<void> {
    this.evaluaciones = this.evaluaciones.filter(
      (e) => e.id_evaluacion !== id,
    );
  }

  async findByTicket(idTicket: number): Promise<Evaluacion | null> {
    const ev = this.evaluaciones.find(
      (e) => e.ticket.id_ticket === idTicket,
    );
    return ev ?? null;
  }
}
