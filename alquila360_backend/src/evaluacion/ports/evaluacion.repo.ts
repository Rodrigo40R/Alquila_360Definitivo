// src/evaluacion/ports/evaluacion.repo.ts
import { Evaluacion } from '../../entity/evaluacion.entity';

// 🔹 Token para inyección de dependencias en Nest
export const EVALUACION_REPOSITORY = 'EVALUACION_REPOSITORY';

// 🔹 Puerto que debe implementar cualquier repositorio de Evaluacion
export interface EvaluacionRepositoryPort {
  create(evaluacion: Evaluacion): Promise<Evaluacion>;
  findAll(): Promise<Evaluacion[]>;
  findOne(id: number): Promise<Evaluacion | null>;
  update(id: number, data: Partial<Evaluacion>): Promise<Evaluacion>;
  remove(id: number): Promise<void>;
  findByTicket(idTicket: number): Promise<Evaluacion | null>;
}
