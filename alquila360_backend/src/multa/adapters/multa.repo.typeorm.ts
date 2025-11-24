// src/multa/adapters/multa.repo.typeorm.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Multa } from '../../entity/multa.entity';
import { MultaRepositoryPort } from '../ports/multa.repo';

@Injectable()
export class MultaTypeOrmRepository implements MultaRepositoryPort {
  constructor(
    @InjectRepository(Multa)
    private readonly repo: Repository<Multa>,
  ) {}

  async create(multa: Multa): Promise<Multa> {
    // id_multa lo genera la BD
    return this.repo.save(multa);
  }

  async findAll(): Promise<Multa[]> {
    return this.repo.find({
      relations: ['contrato', 'cuota'], // ajusta si tus relaciones tienen otro nombre
    });
  }

  async findOne(id: number): Promise<Multa | null> {
    return this.repo.findOne({
      where: { id_multa: id }, // cambia si tu PK se llama distinto
      relations: ['contrato', 'cuota'],
    });
  }

  async update(id: number, data: Partial<Multa>): Promise<Multa> {
    await this.repo.update(id, data);
    const updated = await this.findOne(id);
    return updated as Multa; // el servicio valida que existe antes de actualizar
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async findByContrato(idContrato: number): Promise<Multa[]> {
    return this.repo.find({
      where: { contrato: { id_contrato: idContrato } },
      relations: ['contrato', 'cuota'],
    });
  }
}
