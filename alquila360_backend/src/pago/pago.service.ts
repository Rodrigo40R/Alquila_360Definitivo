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

@Injectable()
export class PagoService {
  constructor(
    @Inject(PAGO_REPOSITORY)
    private readonly pagoRepo: PagoRepositoryPort,

    // ✅ usamos el servicio de cuota, no el repositorio directamente
    private readonly cuotaService: CuotaService,
  ) {}

  async create(dto: CreatePagoDto): Promise<Pago> {
    const cuota = await this.cuotaService.findOne(dto.id_cuota);
    // findOne ya lanza NotFoundException si no existe

    if (cuota.pago) {
      throw new BadRequestException(
        `La cuota ${dto.id_cuota} ya tiene un pago registrado`,
      );
    }

    const pago = new Pago();
    pago.fecha_pago = new Date(dto.fecha_pago);
    pago.metodo_pago = dto.metodo_pago;
    pago.monto = dto.monto;
    pago.cuota = cuota;

    const creado = await this.pagoRepo.create(pago);

    // actualizar estado de la cuota (mínimo el estado)
    cuota.estado = 'PAGADA';
    // si tu entidad/relación lo requiere, mantenemos la referencia en memoria
    cuota.pago = creado;

    // reutilizamos la lógica de actualización de cuota
    await this.cuotaService.update(cuota.id_cuota, {
      estado: cuota.estado,
    } as UpdatePagoDto as any); // si tu UpdateCuotaDto solo tiene estado/monto/fecha

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
    if (dto.metodo_pago !== undefined) partial.metodo_pago = dto.metodo_pago;
    if (dto.monto !== undefined) partial.monto = dto.monto;

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
