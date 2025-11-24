// src/garantia/adapters/garantia.repo.typeorm.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Garantia } from '../../entity/garantia.entity';
import { GarantiaRepositoryPort } from '../ports/garantia.repo';

@Injectable()
export class GarantiaTypeOrmRepository implements GarantiaRepositoryPort {
  constructor(
    @InjectRepository(Garantia)
    private readonly repo: Repository<Garantia>,
  ) {}

  async create(garantia: Garantia): Promise<Garantia> {
    // id_garantia lo genera la BD
    return this.repo.save(garantia);
  }

  async findAll(): Promise<Garantia[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Garantia | null> {
    return this.repo.findOne({
      where: { id_garantia: id }, // ajusta si tu PK tiene otro nombre
    });
  }

  async update(
    id: number,
    data: Partial<Garantia>,
  ): Promise<Garantia> {
    await this.repo.update(id, data);
    const updated = await this.findOne(id);
    return updated as Garantia; // el servicio valida existencia antes
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
