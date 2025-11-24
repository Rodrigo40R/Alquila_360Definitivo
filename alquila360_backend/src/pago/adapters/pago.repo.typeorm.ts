// src/pago/adapters/pago.repo.typeorm.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Pago } from '../../entity/pago.entity';
import { PagoRepositoryPort } from '../ports/pago.repo';

@Injectable()
export class PagoTypeOrmRepository implements PagoRepositoryPort {
  constructor(
    @InjectRepository(Pago)
    private readonly repo: Repository<Pago>,
  ) {}

  async create(pago: Pago): Promise<Pago> {
    // id_pago lo genera la BD (auto-increment)
    return this.repo.save(pago);
  }

  async findAll(): Promise<Pago[]> {
    return this.repo.find({
      relations: ['cuota'], // ajusta si la relación tiene otro nombre
    });
  }

  async findOne(id: number): Promise<Pago | null> {
    return this.repo.findOne({
      where: { id_pago: id }, // cambia si tu PK tiene otro nombre
      relations: ['cuota'],
    });
  }

  async update(id: number, data: Partial<Pago>): Promise<Pago> {
    await this.repo.update(id, data);
    const updated = await this.findOne(id);
    return updated as Pago; // el servicio valida antes cuando haga falta
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async findByCuota(idCuota: number): Promise<Pago | null> {
    return this.repo.findOne({
      where: { cuota: { id_cuota: idCuota } },
      relations: ['cuota'],
    });
  }
}
