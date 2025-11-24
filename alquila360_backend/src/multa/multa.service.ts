// src/multa/multa.service.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { CreateMultaDto } from './dto/create-multa.dto';
import { UpdateMultaDto } from './dto/update-multa.dto';
import { Multa } from '../entity/multa.entity';
import { Cuota } from '../entity/cuota.entity';

import { MULTA_REPOSITORY } from './ports/multa.repo';
import type { MultaRepositoryPort } from './ports/multa.repo';

import { ContratoService } from '../contrato/contrato.service';

@Injectable()
export class MultaService {
  constructor(
    @Inject(MULTA_REPOSITORY)
    private readonly multaRepo: MultaRepositoryPort,

    // ✅ usamos el servicio de contrato, no el repo
    private readonly contratoService: ContratoService,
  ) {}

  async create(dto: CreateMultaDto): Promise<Multa> {
    // ContratoService.findOne ya lanza NotFoundException si no existe
    const contrato = await this.contratoService.findOne(dto.id_contrato);

    const multa = new Multa();
    multa.tipo = dto.tipo;
    multa.monto = dto.monto;
    multa.fecha = new Date(dto.fecha);
    multa.descripcion = dto.descripcion;
    multa.estado = dto.estado;
    multa.contrato = contrato;

    if (dto.id_cuota !== undefined) {
      const cuota = new Cuota();
      (cuota as any).id_cuota = dto.id_cuota;
      multa.cuota = cuota;
    } else {
      multa.cuota = null;
    }

    // método de dominio en la entidad
    multa.registrarMulta();

    return this.multaRepo.create(multa);
  }

  async findAll(): Promise<Multa[]> {
    return this.multaRepo.findAll();
  }

  async findOne(id: number): Promise<Multa> {
    const multa = await this.multaRepo.findOne(id);
    if (!multa) {
      throw new NotFoundException(`No se encontró multa ${id}`);
    }
    return multa;
  }

  async update(id: number, dto: UpdateMultaDto): Promise<Multa> {
    // opcional: validar que exista
    await this.findOne(id);

    const partial: Partial<Multa> = {};

    if (dto.tipo !== undefined) partial.tipo = dto.tipo;
    if (dto.monto !== undefined) partial.monto = dto.monto;
    if (dto.descripcion !== undefined) partial.descripcion = dto.descripcion;
    if (dto.estado !== undefined) partial.estado = dto.estado;

    if (dto.fecha !== undefined) {
      partial.fecha = new Date(dto.fecha);
    }

    if (dto.id_cuota !== undefined) {
      const cuota = new Cuota();
      (cuota as any).id_cuota = dto.id_cuota;
      partial.cuota = cuota;
    }

    return this.multaRepo.update(id, partial);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    return this.multaRepo.remove(id);
  }

  async findByContrato(idContrato: number): Promise<Multa[]> {
    return this.multaRepo.findByContrato(idContrato);
  }

  async anularMulta(id: number): Promise<Multa> {
    const multa = await this.findOne(id);
    multa.anularMulta();
    return this.multaRepo.update(id, multa);
  }
}
