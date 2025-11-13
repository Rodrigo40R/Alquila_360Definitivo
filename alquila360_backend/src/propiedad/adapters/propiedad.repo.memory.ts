import { Injectable } from '@nestjs/common';
import { PropiedadRepositoryPort } from '../ports/propiedad.repo';
import { Propiedad } from '../../entity/propiedad.entity';

@Injectable()
export class InMemoryPropiedadRepository implements PropiedadRepositoryPort {
  private propiedades: Propiedad[] = [];
  private currentId = 1;

  async create(data: Propiedad): Promise<Propiedad> {
    const propiedad = new Propiedad();

    propiedad.id_propiedad = this.currentId++;
    propiedad.direccion = data.direccion;
    propiedad.tipo = data.tipo;
    propiedad.estado = data.estado;
    propiedad.propietario = data.propietario;

    this.propiedades.push(propiedad);
    return propiedad;
  }

  async findAll(): Promise<Propiedad[]> {
    return this.propiedades;
  }

  async findOne(id: number): Promise<Propiedad | null> {
    const propiedad = this.propiedades.find((p) => p.id_propiedad === id);
    return propiedad ?? null;
  }

  async update(
    id: number,
    data: Partial<Propiedad>,
  ): Promise<Propiedad> {
    const propiedad = await this.findOne(id);
    if (!propiedad) {
      throw new Error(`Propiedad con id ${id} no encontrada`);
    }

    if (data.direccion !== undefined) propiedad.direccion = data.direccion;
    if (data.tipo !== undefined) propiedad.tipo = data.tipo;
    if (data.estado !== undefined) propiedad.estado = data.estado;
    // normalmente no cambiamos el propietario desde aquí

    return propiedad;
  }

  async remove(id: number): Promise<void> {
    this.propiedades = this.propiedades.filter(
      (p) => p.id_propiedad !== id,
    );
  }

  async findByPropietario(
    idPropietario: number,
  ): Promise<Propiedad[]> {
    return this.propiedades.filter(
      (p) => p.propietario.id_usuario === idPropietario,
    );
  }
}
