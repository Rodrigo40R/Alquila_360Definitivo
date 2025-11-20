import { Injectable, NotFoundException } from '@nestjs/common';
import { MultaRepositoryPort } from './ports/multa.repo';
import { CreateMultaDto } from './dto/create-multa.dto';
import { UpdateMultaDto } from './dto/update-multa.dto';
import { Multa } from '../entity/multa.entity';
import { ContratoRepositoryPort } from '../contrato/ports/contrato.repo';
import { Cuota } from '../entity/cuota.entity';

@Injectable()
export class MultaService {
  constructor(
    private readonly multaRepo: MultaRepositoryPort,
    private readonly contratoRepo: ContratoRepositoryPort,
  ) {}

  async create(dto: CreateMultaDto): Promise<Multa> {
    const contrato = await this.contratoRepo.findOne(dto.id_contrato);
    if (!contrato) {
      throw new NotFoundException(
        `Contrato ${dto.id_contrato} no encontrado`,
      );
    }

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
