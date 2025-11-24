import { Injectable } from '@nestjs/common';
import { ReporteRepositoryPort } from '../ports/reporte.repo';
import { Reporte } from '../../entity/reporte.entity';

@Injectable()
export class InMemoryReporteRepository implements ReporteRepositoryPort {
  private reportes: Reporte[] = [];
  private currentId = 1;

  async create(reporte: Reporte): Promise<Reporte> {
    reporte.id_reporte = this.currentId++;
    this.reportes.push(reporte);
    return reporte;
  }

  async findAll(): Promise<Reporte[]> {
    return this.reportes;
  }

  async findOne(id: number): Promise<Reporte | null> {
    const rep = this.reportes.find((r) => r.id_reporte === id);
    return rep ?? null;
  }

  async update(
    id: number,
    data: Partial<Reporte>,
  ): Promise<Reporte> {
    const rep = await this.findOne(id);
    if (!rep) {
      throw new Error(`Reporte con id ${id} no encontrado`);
    }

    if (data.tipo !== undefined) rep.tipo = data.tipo;
    if (data.fecha !== undefined) rep.fecha = data.fecha;
    if (data.administrador !== undefined) rep.administrador = data.administrador;

    return rep;
  }

  async remove(id: number): Promise<void> {
    this.reportes = this.reportes.filter((r) => r.id_reporte !== id);
  }

  async findByAdministrador(idAdmin: number): Promise<Reporte[]> {
    return this.reportes.filter(
      (r) => r.administrador.id_usuario === idAdmin,
    );
  }
}
