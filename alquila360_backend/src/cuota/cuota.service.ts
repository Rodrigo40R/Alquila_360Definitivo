import { Injectable, NotFoundException } from '@nestjs/common';
import { CuotaRepositoryPort } from './ports/cuota.repo';
import { CreateCuotaDto } from './dto/create-cuota.dto';
import { UpdateCuotaDto } from './dto/update-cuota.dto';
import { Cuota } from '../entity/cuota.entity';
import { ContratoRepositoryPort } from '../contrato/ports/contrato.repo';

@Injectable()
export class CuotaService {
  constructor(
    private readonly cuotaRepo: CuotaRepositoryPort,
    private readonly contratoRepo: ContratoRepositoryPort,
  ) {}

  async create(dto: CreateCuotaDto): Promise<Cuota> {
    const contrato = await this.contratoRepo.findOne(dto.id_contrato);
    if (!contrato) {
      throw new NotFoundException(
        `Contrato ${dto.id_contrato} no encontrado`,
      );
    }

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
    return this.cuotaRepo.findByContrato(idContrato);
  }
}
