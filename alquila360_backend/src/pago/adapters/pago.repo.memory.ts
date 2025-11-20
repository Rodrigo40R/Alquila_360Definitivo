import { Injectable } from '@nestjs/common';
import { PagoRepositoryPort } from '../ports/pago.repo';
import { Pago } from '../../entity/pago.entity';

@Injectable()
export class InMemoryPagoRepository implements PagoRepositoryPort {
  private pagos: Pago[] = [];
  private currentId = 1;

  async create(pago: Pago): Promise<Pago> {
    pago.id_pago = this.currentId++;
    this.pagos.push(pago);
    return pago;
  }

  async findAll(): Promise<Pago[]> {
    return this.pagos;
  }

  async findOne(id: number): Promise<Pago | null> {
    return this.pagos.find((p) => p.id_pago === id) ?? null;
  }

  async update(id: number, data: Partial<Pago>): Promise<Pago> {
    const pago = await this.findOne(id);
    if (!pago) throw new Error(`Pago con id ${id} no encontrado`);

    if (data.fecha_pago !== undefined) pago.fecha_pago = data.fecha_pago;
    if (data.metodo_pago !== undefined) pago.metodo_pago = data.metodo_pago;
    if (data.monto !== undefined) pago.monto = data.monto;
    if (data.cuota !== undefined) pago.cuota = data.cuota;

    return pago;
  }

  async remove(id: number): Promise<void> {
    this.pagos = this.pagos.filter((p) => p.id_pago !== id);
  }

  async findByCuota(idCuota: number): Promise<Pago | null> {
    return this.pagos.find((p) => p.cuota.id_cuota === idCuota) ?? null;
  }
}
