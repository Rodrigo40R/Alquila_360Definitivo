// src/propiedad/propiedad.service.ts
import {
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { PROPIEDAD_REPOSITORY } from './ports/propiedad.repo';
import type { PropiedadRepositoryPort } from './ports/propiedad.repo';

import { CreatePropiedadDto } from './dto/create-propiedad.dto';
import { UpdatePropiedadDto } from './dto/update-propiedad.dto';
import { Propiedad } from '../entity/propiedad.entity';

import { USER_REPOSITORY } from '../user/ports/user.repo';
import type { UserRepositoryPort } from '../user/ports/user.repo';

import { Propietario } from '../entity/propietario.entity';

@Injectable()
export class PropiedadService {
  constructor(
    // token del repo de propiedades
    @Inject(PROPIEDAD_REPOSITORY)
    private readonly propiedadRepo: PropiedadRepositoryPort,

    // token del repo de usuarios (viene exportado desde UserModule)
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepositoryPort,
  ) {}

  async create(dto: CreatePropiedadDto): Promise<Propiedad> {
    const user = await this.userRepo.findOne(dto.id_propietario);

    if (!user) {
      throw new NotFoundException(
        `Propietario con id ${dto.id_propietario} no encontrado`,
      );
    }

    if (user.tipo_usuario !== 'PROPIETARIO') {
      throw new BadRequestException(
        `El usuario con id ${dto.id_propietario} no es un PROPIETARIO`,
      );
    }

    const propietario = user as Propietario;

    const propiedad = new Propiedad();
    propiedad.direccion = dto.direccion;
    propiedad.tipo = dto.tipo;
    propiedad.estado = dto.estado;
    propiedad.propietario = propietario;

    return this.propiedadRepo.create(propiedad);
  }

  async findAll(): Promise<Propiedad[]> {
    return this.propiedadRepo.findAll();
  }

  async findOne(id: number): Promise<Propiedad> {
    const propiedad = await this.propiedadRepo.findOne(id);
    if (!propiedad) {
      throw new NotFoundException(`Propiedad con id ${id} no encontrada`);
    }
    return propiedad;
  }

  async update(id: number, dto: UpdatePropiedadDto): Promise<Propiedad> {
    // opcional: valida existencia
    await this.findOne(id);
    return this.propiedadRepo.update(id, dto);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id); // valida existencia
    return this.propiedadRepo.remove(id);
  }

  async findByPropietario(idPropietario: number): Promise<Propiedad[]> {
    const user = await this.userRepo.findOne(idPropietario);

    if (!user || user.tipo_usuario !== 'PROPIETARIO') {
      throw new NotFoundException(
        `Propietario con id ${idPropietario} no encontrado`,
      );
    }

    return this.propiedadRepo.findByPropietario(idPropietario);
  }
}
