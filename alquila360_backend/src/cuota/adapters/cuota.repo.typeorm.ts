// src/cuota/adapters/cuota.repo.typeorm.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Cuota } from '../../entity/cuota.entity';
import { CuotaRepositoryPort } from '../ports/cuota.repo';

@Injectable()
export class CuotaTypeOrmRepository implements CuotaRepositoryPort {
  constructor(
    @InjectRepository(Cuota)
    private readonly repo: Repository<Cuota>,
  ) {}

  async create(cuota: Cuota): Promise<Cuota> {
    // La PK la maneja la BD (id_cuota auto-increment)
    return this.repo.save(cuota);
  }

  async findAll(): Promise<Cuota[]> {
    return this.repo.find({
      relations: ['contrato', 'pago'], // ajusta si tus relaciones tienen otros nombres
    });
  }

  async findOne(id: number): Promise<Cuota | null> {
    return this.repo.findOne({
      where: { id_cuota: id }, // ajusta si la PK tiene otro nombre
      relations: ['contrato', 'pago'],
    });
  }

  async update(id: number, data: Partial<Cuota>): Promise<Cuota> {
    await this.repo.update(id, data);
    const updated = await this.findOne(id);
    return updated as Cuota; // el servicio ya valida la existencia cuando haga falta
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async findByContrato(idContrato: number): Promise<Cuota[]> {
    return this.repo.find({
      where: { contrato: { id_contrato: idContrato } },
      relations: ['contrato', 'pago'],
    });
  }
}
