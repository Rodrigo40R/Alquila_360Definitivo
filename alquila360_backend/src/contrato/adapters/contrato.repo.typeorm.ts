// src/contrato/adapters/contrato.repo.typeorm.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Contrato } from '../../entity/contrato.entity';
import { ContratoRepositoryPort } from '../ports/contrato.repo';

@Injectable()
export class ContratoTypeOrmRepository implements ContratoRepositoryPort {
  constructor(
    @InjectRepository(Contrato)
    private readonly repo: Repository<Contrato>,
  ) {}

  async create(contrato: Contrato): Promise<Contrato> {
    return this.repo.save(contrato);
  }

  async findAll(): Promise<Contrato[]> {
    return this.repo.find({
      relations: ['propietario', 'inquilino', 'garantia'],
    });
  }

  async findOne(id: number): Promise<Contrato | null> {
    return this.repo.findOne({
      where: { id_contrato: id },
      relations: ['propietario', 'inquilino', 'garantia'],
    });
  }

  async update(id: number, data: Partial<Contrato>): Promise<Contrato> {
    await this.repo.update(id, data);
    const updated = await this.findOne(id);
    return updated as Contrato;
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async findByPropietario(idPropietario: number): Promise<Contrato[]> {
    return this.repo.find({
      where: { propietario: { id_usuario: idPropietario } },
      relations: ['propietario', 'inquilino', 'garantia'],
    });
  }

  async findByInquilino(idInquilino: number): Promise<Contrato[]> {
    return this.repo.find({
      where: { inquilino: { id_usuario: idInquilino } },
      relations: ['propietario', 'inquilino', 'garantia'],
    });
  }
}
