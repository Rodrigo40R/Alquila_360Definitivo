import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PropiedadRepositoryPort } from './ports/propiedad.repo';
import { CreatePropiedadDto } from './dto/create-propiedad.dto';
import { UpdatePropiedadDto } from './dto/update-propiedad.dto';
import { Propiedad } from '../entity/propiedad.entity';
import { UserRepositoryPort } from '../user/ports/user.repo';
import { Propietario } from '../entity/propietario.entity';

@Injectable()
export class PropiedadService {
  constructor(
    private readonly propiedadRepo: PropiedadRepositoryPort,
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

  async update(
    id: number,
    dto: UpdatePropiedadDto,
  ): Promise<Propiedad> {
    // Por simplicidad NO cambiamos el propietario aquí
    return this.propiedadRepo.update(id, dto);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id); // lanza excepción si no existe
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
