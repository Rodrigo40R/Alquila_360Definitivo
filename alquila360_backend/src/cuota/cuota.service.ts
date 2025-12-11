// src/cuota/cuota.service.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { CreateCuotaDto } from './dto/create-cuota.dto';
import { UpdateCuotaDto } from './dto/update-cuota.dto';
import { Cuota } from '../entity/cuota.entity';

import { CUOTA_REPOSITORY } from './ports/cuota.repo';
import type { CuotaRepositoryPort } from './ports/cuota.repo';

import { ContratoService } from '../contrato/contrato.service';

@Injectable()
export class CuotaService {
  constructor(
    @Inject(CUOTA_REPOSITORY)
    private readonly cuotaRepo: CuotaRepositoryPort,

    // usamos el servicio de contrato, no el repositorio directamente
    private readonly contratoService: ContratoService,
  ) {}

  async create(dto: CreateCuotaDto): Promise<Cuota> {
    const contrato = await this.contratoService.findOne(dto.id_contrato);
    // findOne ya lanza NotFoundException si no existe

    const cuota = new Cuota();
    cuota.monto = dto.monto;
    cuota.fecha_vencimiento = new Date(dto.fecha_vencimiento);
    cuota.estado = dto.estado;
    cuota.contrato = contrato;
    cuota.pago = null;

    return this.cuotaRepo.create(cuota);
  }

  async findAll(): Promise<Cuota[]> {
    return this.cuotaRepo.findAll();
  }

  async findOne(id: number): Promise<Cuota> {
    const cuota = await this.cuotaRepo.findOne(id);
    if (!cuota) {
      throw new NotFoundException(`Cuota ${id} no encontrada`);
    }
    return cuota;
  }

  async update(id: number, dto: UpdateCuotaDto): Promise<Cuota> {
    // opcional: validar que exista
    await this.findOne(id);

    const partial: Partial<Cuota> = {};
    if (dto.monto !== undefined) partial.monto = dto.monto;
    if (dto.fecha_vencimiento !== undefined) {
      partial.fecha_vencimiento = new Date(dto.fecha_vencimiento);
    }
    if (dto.estado !== undefined) partial.estado = dto.estado;

    return this.cuotaRepo.update(id, partial);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    return this.cuotaRepo.remove(id);
  }

  async findByContrato(idContrato: number): Promise<Cuota[]> {
    // podrías validar que el contrato exista primero si quieres:
    // await this.contratoService.findOne(idContrato);
    return this.cuotaRepo.findByContrato(idContrato);
  }

  async pagarCuota(id: number): Promise<Cuota> {
    const cuota = await this.findOne(id);
    
    if (cuota.estado === 'PAGADA') {
      throw new NotFoundException(`La cuota ${id} ya está pagada`);
    }
    
    return this.cuotaRepo.update(id, { estado: 'PAGADA' });
  }
}
