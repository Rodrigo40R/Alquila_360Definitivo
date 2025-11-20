import { Injectable } from '@nestjs/common';
import { CuotaRepositoryPort } from '../ports/cuota.repo';
import { Cuota } from '../../entity/cuota.entity';

@Injectable()
export class InMemoryCuotaRepository implements CuotaRepositoryPort {
  private cuotas: Cuota[] = [];
  private currentId = 1;

  async create(cuota: Cuota): Promise<Cuota> {
    cuota.id_cuota = this.currentId++;
    this.cuotas.push(cuota);
    return cuota;
  }

  async findAll(): Promise<Cuota[]> {
    return this.cuotas;
  }

  async findOne(id: number): Promise<Cuota | null> {
    return this.cuotas.find((c) => c.id_cuota === id) ?? null;
  }

  async update(id: number, data: Partial<Cuota>): Promise<Cuota> {
    const cuota = await this.findOne(id);
    if (!cuota) throw new Error(`Cuota con id ${id} no encontrada`);

    if (data.monto !== undefined) cuota.monto = data.monto;
    if (data.fecha_vencimiento !== undefined) cuota.fecha_vencimiento = data.fecha_vencimiento;
    if (data.estado !== undefined) cuota.estado = data.estado;
    if (data.contrato !== undefined) cuota.contrato = data.contrato;
    if (data.pago !== undefined) cuota.pago = data.pago;

    return cuota;
  }

  async remove(id: number): Promise<void> {
    this.cuotas = this.cuotas.filter((c) => c.id_cuota !== id);
  }

  async findByContrato(idContrato: number): Promise<Cuota[]> {
    return this.cuotas.filter(
      (c) => c.contrato.id_contrato === idContrato,
    );
  }
}
