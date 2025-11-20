import { Reporte } from '../../entity/reporte.entity';

export abstract class ReporteRepositoryPort {
  abstract create(reporte: Reporte): Promise<Reporte>;
  abstract findAll(): Promise<Reporte[]>;
  abstract findOne(id: number): Promise<Reporte | null>;
  abstract update(id: number, data: Partial<Reporte>): Promise<Reporte>;
  abstract remove(id: number): Promise<void>;
  abstract findByAdministrador(idAdmin: number): Promise<Reporte[]>;
}
