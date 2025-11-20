import { Evaluacion } from '../../entity/evaluacion.entity';

export abstract class EvaluacionRepositoryPort {
  abstract create(evaluacion: Evaluacion): Promise<Evaluacion>;
  abstract findAll(): Promise<Evaluacion[]>;
  abstract findOne(id: number): Promise<Evaluacion | null>;
  abstract update(id: number, data: Partial<Evaluacion>): Promise<Evaluacion>;
  abstract remove(id: number): Promise<void>;
  abstract findByTicket(idTicket: number): Promise<Evaluacion | null>;
}
