import { Injectable } from '@nestjs/common';
import { ContratoRepositoryPort } from '../ports/contrato.repo';
import { Contrato } from '../../entity/contrato.entity';

@Injectable()
export class InMemoryContratoRepository implements ContratoRepositoryPort {
  private contratos: Contrato[] = [];
  private currentId = 1;

  async create(contrato: Contrato): Promise<Contrato> {
    contrato.id_contrato = this.currentId++;
    this.contratos.push(contrato);
    return contrato;
  }

  async findAll(): Promise<Contrato[]> {
    return this.contratos;
  }

  async findOne(id: number): Promise<Contrato | null> {
    const contrato = this.contratos.find((c) => c.id_contrato === id);
    return contrato ?? null;
  }

  async update(
    id: number,
    data: Partial<Contrato>,
  ): Promise<Contrato> {
    const contrato = await this.findOne(id);
    if (!contrato) {
      throw new Error(`Contrato con id ${id} no encontrado`);
    }

    if (data.fecha_inicio !== undefined) contrato.fecha_inicio = data.fecha_inicio;
    if (data.fecha_fin !== undefined) contrato.fecha_fin = data.fecha_fin;
    if (data.monto_mensual !== undefined) contrato.monto_mensual = data.monto_mensual;
    if (data.estado !== undefined) contrato.estado = data.estado;
    if (data.propietario !== undefined) contrato.propietario = data.propietario;
    if (data.inquilino !== undefined) contrato.inquilino = data.inquilino;
    if (data.garantia !== undefined) contrato.garantia = data.garantia;

    return contrato;
  }

  async remove(id: number): Promise<void> {
    this.contratos = this.contratos.filter(
      (c) => c.id_contrato !== id,
    );
  }

  async findByPropietario(
    idPropietario: number,
  ): Promise<Contrato[]> {
    return this.contratos.filter(
      (c) => c.propietario.id_usuario === idPropietario,
    );
  }

  async findByInquilino(
    idInquilino: number,
  ): Promise<Contrato[]> {
    return this.contratos.filter(
      (c) => c.inquilino.id_usuario === idInquilino,
    );
  }
}
