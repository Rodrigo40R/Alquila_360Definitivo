// src/reporte/adapters/reporte.repo.typeorm.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Reporte } from '../../entity/reporte.entity';
import { ReporteRepositoryPort } from '../ports/reporte.repo';

@Injectable()
export class ReporteTypeOrmRepository implements ReporteRepositoryPort {
  constructor(
    @InjectRepository(Reporte)
    private readonly repo: Repository<Reporte>,
  ) {}

  async create(reporte: Reporte): Promise<Reporte> {
    // id_reporte lo genera la BD
    return this.repo.save(reporte);
  }

  async findAll(): Promise<Reporte[]> {
    return this.repo.find({
      relations: ['administrador'], // ajusta si el nombre de la relación cambia
    });
  }

  async findOne(id: number): Promise<Reporte | null> {
    return this.repo.findOne({
      where: { id_reporte: id }, // cambia si tu PK tiene otro nombre
      relations: ['administrador'],
    });
  }

  async update(
    id: number,
    data: Partial<Reporte>,
  ): Promise<Reporte> {
    await this.repo.update(id, data);
    const updated = await this.findOne(id);
    return updated as Reporte; // el servicio valida existencia antes
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async findByAdministrador(idAdmin: number): Promise<Reporte[]> {
    return this.repo.find({
      where: { administrador: { id_usuario: idAdmin } },
      relations: ['administrador'],
    });
  }
}
