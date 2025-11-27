import { Injectable } from '@nestjs/common';
import { MultaRepositoryPort } from '../ports/multa.repo';
import { Multa } from '../../entity/multa.entity';

@Injectable()
export class InMemoryMultaRepository implements MultaRepositoryPort {
  private multas: Multa[] = [];
  private currentId = 1;

  async create(multa: Multa): Promise<Multa> {
    multa.id_multa = this.currentId++;
    this.multas.push(multa);
    return multa;
  }

  async findAll(): Promise<Multa[]> {
    return this.multas;
  }

  async findOne(id: number): Promise<Multa | null> {
    return this.multas.find((m) => m.id_multa === id) ?? null;
  }

  async update(id: number, data: Partial<Multa>): Promise<Multa> {
    const multa = await this.findOne(id);
    if (!multa) throw new Error(`Multa con id ${id} no encontrada`);

    if (data.tipo !== undefined) multa.tipo = data.tipo;
    if (data.monto !== undefined) multa.monto = data.monto;
    if (data.fecha !== undefined) multa.fecha = data.fecha;
    if (data.descripcion !== undefined) multa.descripcion = data.descripcion;
    if (data.estado !== undefined) multa.estado = data.estado;
    if (data.contrato !== undefined) multa.contrato = data.contrato;
    if (data.cuota !== undefined) multa.cuota = data.cuota;

    return multa;
  }

  async remove(id: number): Promise<void> {
    this.multas = this.multas.filter((m) => m.id_multa !== id);
  }

  async findByContrato(idContrato: number): Promise<Multa[]> {
    return this.multas.filter((m) => m.contrato.id_contrato === idContrato);
  }
}
