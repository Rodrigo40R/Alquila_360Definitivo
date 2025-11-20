import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ContratoRepositoryPort } from './ports/contrato.repo';
import { CreateContratoDto } from './dto/create-contrato.dto';
import { UpdateContratoDto } from './dto/update-contrato.dto';
import { Contrato } from '../entity/contrato.entity';
import { UserRepositoryPort } from '../user/ports/user.repo';
import { Propietario } from '../entity/propietario.entity';
import { Inquilino } from '../entity/inquilino.entity';
import { Garantia } from '../entity/garantia.entity';

@Injectable()
export class ContratoService {
  constructor(
    private readonly contratoRepo: ContratoRepositoryPort,
    private readonly userRepo: UserRepositoryPort,
  ) {}

  async create(dto: CreateContratoDto): Promise<Contrato> {
    // 1) validar propietario
    const ownerUser = await this.userRepo.findOne(dto.id_propietario);
    if (!ownerUser) {
      throw new NotFoundException(
        `Propietario con id ${dto.id_propietario} no encontrado`,
      );
    }
    if (ownerUser.tipo_usuario !== 'PROPIETARIO') {
      throw new BadRequestException(
        `El usuario ${dto.id_propietario} no es PROPIETARIO`,
      );
    }
    const propietario = ownerUser as Propietario;

    // 2) validar inquilino
    const tenantUser = await this.userRepo.findOne(dto.id_inquilino);
    if (!tenantUser) {
      throw new NotFoundException(
        `Inquilino con id ${dto.id_inquilino} no encontrado`,
      );
    }
    if (tenantUser.tipo_usuario !== 'INQUILINO') {
      throw new BadRequestException(
        `El usuario ${dto.id_inquilino} no es INQUILINO`,
      );
    }
    const inquilino = tenantUser as Inquilino;

    const contrato = new Contrato();
    contrato.fecha_inicio = new Date(dto.fecha_inicio);
    contrato.fecha_fin = new Date(dto.fecha_fin);
    contrato.monto_mensual = dto.monto_mensual;
    contrato.estado = dto.estado;
    contrato.propietario = propietario;
    contrato.inquilino = inquilino;

    if (dto.id_garantia !== undefined) {
      const garantia = new Garantia();
      // asumimos que la PK es id_garantia
      (garantia as any).id_garantia = dto.id_garantia;
      contrato.garantia = garantia;
    } else {
      contrato.garantia = null;
    }

    return this.contratoRepo.create(contrato);
  }

  async findAll(): Promise<Contrato[]> {
    return this.contratoRepo.findAll();
  }

  async findOne(id: number): Promise<Contrato> {
    const contrato = await this.contratoRepo.findOne(id);
    if (!contrato) {
      throw new NotFoundException(`Contrato con id ${id} no encontrado`);
    }
    return contrato;
  }

  async update(
    id: number,
    dto: UpdateContratoDto,
  ): Promise<Contrato> {
    const contrato = await this.findOne(id);

    const partial: Partial<Contrato> = {};

    if (dto.fecha_inicio !== undefined) {
      partial.fecha_inicio = new Date(dto.fecha_inicio);
    }
    if (dto.fecha_fin !== undefined) {
      partial.fecha_fin = new Date(dto.fecha_fin);
    }
    if (dto.monto_mensual !== undefined) {
      partial.monto_mensual = dto.monto_mensual;
    }
    if (dto.estado !== undefined) {
      partial.estado = dto.estado;
    }

    if (dto.id_garantia !== undefined) {
      const garantia = new Garantia();
      (garantia as any).id_garantia = dto.id_garantia;
      partial.garantia = garantia;
    }

    return this.contratoRepo.update(id, partial);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    return this.contratoRepo.remove(id);
  }

  async findByPropietario(idPropietario: number): Promise<Contrato[]> {
    const user = await this.userRepo.findOne(idPropietario);
    if (!user || user.tipo_usuario !== 'PROPIETARIO') {
      throw new NotFoundException(
        `Propietario con id ${idPropietario} no encontrado`,
      );
    }
    return this.contratoRepo.findByPropietario(idPropietario);
  }

  async findByInquilino(idInquilino: number): Promise<Contrato[]> {
    const user = await this.userRepo.findOne(idInquilino);
    if (!user || user.tipo_usuario !== 'INQUILINO') {
      throw new NotFoundException(
        `Inquilino con id ${idInquilino} no encontrado`,
      );
    }
    return this.contratoRepo.findByInquilino(idInquilino);
  }
}
