// src/contrato/ports/contrato.repo.ts
import { Contrato } from '../../entity/contrato.entity';

// 🔹 Token para inyección de dependencias en Nest
export const CONTRATO_REPOSITORY = 'CONTRATO_REPOSITORY';

// 🔹 Puerto (contrato) que debe implementar cualquier repositorio de contrato
export interface ContratoRepositoryPort {
  create(contrato: Contrato): Promise<Contrato>;
  findAll(): Promise<Contrato[]>;
  findOne(id: number): Promise<Contrato | null>;
  update(id: number, data: Partial<Contrato>): Promise<Contrato>;
  remove(id: number): Promise<void>;
  findByPropietario(idPropietario: number): Promise<Contrato[]>;
  findByInquilino(idInquilino: number): Promise<Contrato[]>;
}
