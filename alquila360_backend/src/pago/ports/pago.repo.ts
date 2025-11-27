// src/pago/ports/pago.repo.ts
import { Pago } from '../../entity/pago.entity';

// 🔹 Token para inyección de dependencias en Nest
export const PAGO_REPOSITORY = 'PAGO_REPOSITORY';

// 🔹 Puerto que debe implementar cualquier repositorio de Pago
export interface PagoRepositoryPort {
  create(pago: Pago): Promise<Pago>;
  findAll(): Promise<Pago[]>;
  findOne(id: number): Promise<Pago | null>;
  update(id: number, data: Partial<Pago>): Promise<Pago>;
  remove(id: number): Promise<void>;
  findByCuota(idCuota: number): Promise<Pago | null>;
}
