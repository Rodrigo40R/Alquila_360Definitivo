// src/propiedad/adapters/propiedad.repo.typeorm.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Propiedad } from '../../entity/propiedad.entity';
import { PropiedadRepositoryPort } from '../ports/propiedad.repo';
import { UpdatePropiedadDto } from '../dto/update-propiedad.dto';

@Injectable()
export class PropiedadTypeOrmRepository implements PropiedadRepositoryPort {
  constructor(
    @InjectRepository(Propiedad)
    private readonly repo: Repository<Propiedad>,
  ) {}

  async create(data: Propiedad): Promise<Propiedad> {
    // data ya viene armado desde el service (con propietario)
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async findAll(): Promise<Propiedad[]> {
    return this.repo.find({
      relations: ['propietario'], // ajusta si el nombre de la relación cambia
    });
  }

  async findOne(id: number): Promise<Propiedad | null> {
    return this.repo.findOne({
      where: { id_propiedad: id }, // ajusta si tu PK tiene otro nombre
      relations: ['propietario'],
    });
  }

  async update(id: number, data: UpdatePropiedadDto): Promise<Propiedad> {
    await this.repo.update(id, data);
    const updated = await this.findOne(id);
    return updated as Propiedad; // el servicio valida que exista antes
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async findByPropietario(idPropietario: number): Promise<Propiedad[]> {
    return this.repo.find({
      where: { propietario: { id_usuario: idPropietario } },
      relations: ['propietario'],
    });
  }
}
