// src/garantia/ports/garantia.repo.ts
import { Garantia } from '../../entity/garantia.entity';

// 🔹 Token para inyección de dependencias en Nest
export const GARANTIA_REPOSITORY = 'GARANTIA_REPOSITORY';

// 🔹 Puerto que debe implementar cualquier repositorio de Garantia
export interface GarantiaRepositoryPort {
  create(garantia: Garantia): Promise<Garantia>;
  findAll(): Promise<Garantia[]>;
  findOne(id: number): Promise<Garantia | null>;
  update(id: number, data: Partial<Garantia>): Promise<Garantia>;
  remove(id: number): Promise<void>;
}
