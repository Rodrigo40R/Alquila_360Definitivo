// src/reporte/ports/reporte.repo.ts
import { Reporte } from '../../entity/reporte.entity';

// 🔹 Token para inyección de dependencias en Nest
export const REPORTE_REPOSITORY = 'REPORTE_REPOSITORY';

// 🔹 Puerto que debe implementar cualquier repositorio de Reporte
export interface ReporteRepositoryPort {
  create(reporte: Reporte): Promise<Reporte>;
  findAll(): Promise<Reporte[]>;
  findOne(id: number): Promise<Reporte | null>;
  update(id: number, data: Partial<Reporte>): Promise<Reporte>;
  remove(id: number): Promise<void>;
  findByAdministrador(idAdmin: number): Promise<Reporte[]>;
}
