import { Injectable } from '@nestjs/common';
import { GarantiaRepositoryPort } from '../ports/garantia.repo';
import { Garantia } from '../../entity/garantia.entity';

@Injectable()
export class InMemoryGarantiaRepository implements GarantiaRepositoryPort {
  private garantias: Garantia[] = [];
  private currentId = 1;

  async create(garantia: Garantia): Promise<Garantia> {
    garantia.id_garantia = this.currentId++;
    this.garantias.push(garantia);
    return garantia;
  }

  async findAll(): Promise<Garantia[]> {
    return this.garantias;
  }

  async findOne(id: number): Promise<Garantia | null> {
    const garantia = this.garantias.find((g) => g.id_garantia === id);
    return garantia ?? null;
  }

  async update(
    id: number,
    data: Partial<Garantia>,
  ): Promise<Garantia> {
    const garantia = await this.findOne(id);
    if (!garantia) {
      throw new Error(`Garantía con id ${id} no encontrada`);
    }

    if (data.monto !== undefined) garantia.monto = data.monto;
    if (data.descripcion !== undefined) garantia.descripcion = data.descripcion;

    return garantia;
  }

  async remove(id: number): Promise<void> {
    this.garantias = this.garantias.filter(
      (g) => g.id_garantia !== id,
    );
  }
}
