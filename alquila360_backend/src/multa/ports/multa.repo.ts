// src/multa/ports/multa.repo.ts
import { Multa } from '../../entity/multa.entity';

// 🔹 Token para inyección de dependencias en Nest
export const MULTA_REPOSITORY = 'MULTA_REPOSITORY';

// 🔹 Puerto que debe implementar cualquier repositorio de Multa
export interface MultaRepositoryPort {
  create(multa: Multa): Promise<Multa>;
  findAll(): Promise<Multa[]>;
  findOne(id: number): Promise<Multa | null>;
  update(id: number, data: Partial<Multa>): Promise<Multa>;
  remove(id: number): Promise<void>;
  findByContrato(idContrato: number): Promise<Multa[]>;
}
