// src/cuota/ports/cuota.repo.ts
import { Cuota } from '../../entity/cuota.entity';

// 🔹 Token para inyección de dependencias en Nest
export const CUOTA_REPOSITORY = 'CUOTA_REPOSITORY';

// 🔹 Puerto que debe implementar cualquier repositorio de Cuota
export interface CuotaRepositoryPort {
  create(cuota: Cuota): Promise<Cuota>;
  findAll(): Promise<Cuota[]>;
  findOne(id: number): Promise<Cuota | null>;
  update(id: number, data: Partial<Cuota>): Promise<Cuota>;
  remove(id: number): Promise<void>;
  findByContrato(idContrato: number): Promise<Cuota[]>;
}
