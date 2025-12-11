// src/pago/pago.service.ts
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { Pago } from '../entity/pago.entity';

import { PAGO_REPOSITORY } from './ports/pago.repo';
import type { PagoRepositoryPort } from './ports/pago.repo';

import { CuotaService } from '../cuota/cuota.service';
import { UpdateCuotaDto } from '../cuota/dto/update-cuota.dto'; // 👈 IMPORT CORRECTO

@Injectable()
export class PagoService {
  constructor(
    @Inject(PAGO_REPOSITORY)
    private readonly pagoRepo: PagoRepositoryPort,

    // ✅ usamos el servicio de cuota, no el repositorio directamente
    private readonly cuotaService: CuotaService,
  ) {}

  async create(dto: CreatePagoDto): Promise<Pago> {
    // 1) Verificar que la cuota exista
    const cuota = await this.cuotaService.findOne(dto.id_cuota);
    // 👆 Si no existe, CuotaService.findOne debería lanzar NotFoundException

    // 2) Verificar si ya tiene pago usando el repositorio de pagos
    const existingPago = await this.pagoRepo.findByCuota(dto.id_cuota);
    if (existingPago) {
      throw new BadRequestException(
        `La cuota ${dto.id_cuota} ya tiene un pago registrado`,
      );
    }

    // 3) Crear el pago
    const pago = new Pago();
    pago.fecha_pago = new Date(dto.fecha_pago);
    pago.metodo_pago = dto.metodo_pago;
    pago.monto = dto.monto;
    pago.cuota = cuota;

    const creado = await this.pagoRepo.create(pago);

    // 4) Actualizar estado de la cuota a PAGADA
    const updateCuotaDto: UpdateCuotaDto = {
      estado: 'PAGADA',
    } as UpdateCuotaDto;

    await this.cuotaService.update(cuota.id_cuota, updateCuotaDto);

    return creado;
  }

  async findAll(): Promise<Pago[]> {
    return this.pagoRepo.findAll();
  }

  async findOne(id: number): Promise<Pago> {
    const pago = await this.pagoRepo.findOne(id);
    if (!pago) {
      throw new NotFoundException(`Pago ${id} no encontrado`);
    }
    return pago;
  }

  async update(id: number, dto: UpdatePagoDto): Promise<Pago> {
    const partial: Partial<Pago> = {};

    if (dto.fecha_pago !== undefined) {
      partial.fecha_pago = new Date(dto.fecha_pago);
    }
    if (dto.metodo_pago !== undefined) {
      partial.metodo_pago = dto.metodo_pago;
    }
    if (dto.monto !== undefined) {
      partial.monto = dto.monto;
    }

    return this.pagoRepo.update(id, partial);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    return this.pagoRepo.remove(id);
  }

  async findByCuota(idCuota: number): Promise<Pago> {
    const pago = await this.pagoRepo.findByCuota(idCuota);
    if (!pago) {
      throw new NotFoundException(
        `No se encontró pago para la cuota ${idCuota}`,
      );
    }
    return pago;
  }
}
