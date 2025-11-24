// src/garantia/garantia.service.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGarantiaDto } from './dto/create-garantia.dto';
import { UpdateGarantiaDto } from './dto/update-garantia.dto';
import { Garantia } from '../entity/garantia.entity';

import { GARANTIA_REPOSITORY } from './ports/garantia.repo';
import type { GarantiaRepositoryPort } from './ports/garantia.repo';

@Injectable()
export class GarantiaService {
  constructor(
    @Inject(GARANTIA_REPOSITORY)
    private readonly garantiaRepo: GarantiaRepositoryPort,
  ) {}

  async create(dto: CreateGarantiaDto): Promise<Garantia> {
    const garantia = new Garantia();
    garantia.monto = dto.monto;
    garantia.descripcion = dto.descripcion;

    return this.garantiaRepo.create(garantia);
  }

  async findAll(): Promise<Garantia[]> {
    return this.garantiaRepo.findAll();
  }

  async findOne(id: number): Promise<Garantia> {
    const garantia = await this.garantiaRepo.findOne(id);
    if (!garantia) {
      throw new NotFoundException(`Garantía con id ${id} no encontrada`);
    }
    return garantia;
  }

  async update(
    id: number,
    dto: UpdateGarantiaDto,
  ): Promise<Garantia> {
    await this.findOne(id); // valida existencia
    return this.garantiaRepo.update(id, dto);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    return this.garantiaRepo.remove(id);
  }

  // método que usa la lógica de la entidad
  async usarParaDanos(id: number, montoDano: number): Promise<Garantia> {
    const garantia = await this.findOne(id);
    garantia.usarParaDanos(montoDano);
    return this.garantiaRepo.update(id, garantia);
  }
}
