// src/reporte/reporte.service.ts
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateReporteDto } from './dto/create-reporte.dto';
import { UpdateReporteDto } from './dto/update-reporte.dto';
import { Reporte } from '../entity/reporte.entity';

import { REPORTE_REPOSITORY } from './ports/reporte.repo';
import type { ReporteRepositoryPort } from './ports/reporte.repo';

import { USER_REPOSITORY } from '../user/ports/user.repo';
import type { UserRepositoryPort } from '../user/ports/user.repo';

import { Administrador } from '../entity/administrador.entity';

@Injectable()
export class ReporteService {
  constructor(
    @Inject(REPORTE_REPOSITORY)
    private readonly reporteRepo: ReporteRepositoryPort,

    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepositoryPort,
  ) {}

  async create(dto: CreateReporteDto): Promise<Reporte> {
    const adminUser = await this.userRepo.findOne(dto.id_administrador);
    if (!adminUser) {
      throw new NotFoundException(
        `Administrador con id ${dto.id_administrador} no encontrado`,
      );
    }
    if (adminUser.tipo_usuario !== 'ADMINISTRADOR') {
      throw new BadRequestException(
        `El usuario ${dto.id_administrador} no es ADMINISTRADOR`,
      );
    }

    const admin = adminUser as Administrador;

    const reporte = new Reporte();
    reporte.tipo = dto.tipo;
    reporte.fecha = new Date(dto.fecha);
    reporte.administrador = admin;

    return this.reporteRepo.create(reporte);
  }

  async findAll(): Promise<Reporte[]> {
    return this.reporteRepo.findAll();
  }

  async findOne(id: number): Promise<Reporte> {
    const rep = await this.reporteRepo.findOne(id);
    if (!rep) {
      throw new NotFoundException(`Reporte con id ${id} no encontrado`);
    }
    return rep;
  }

  async update(
    id: number,
    dto: UpdateReporteDto,
  ): Promise<Reporte> {
    // valida existencia
    await this.findOne(id);

    const partial: Partial<Reporte> = {};
    if (dto.tipo !== undefined) partial.tipo = dto.tipo;
    if (dto.fecha !== undefined) partial.fecha = new Date(dto.fecha);

    return this.reporteRepo.update(id, partial);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    return this.reporteRepo.remove(id);
  }

  async findByAdministrador(idAdmin: number): Promise<Reporte[]> {
    const user = await this.userRepo.findOne(idAdmin);
    if (!user || user.tipo_usuario !== 'ADMINISTRADOR') {
      throw new NotFoundException(
        `Administrador con id ${idAdmin} no encontrado`,
      );
    }
    return this.reporteRepo.findByAdministrador(idAdmin);
  }

  // Simula generar el PDF usando el método de la entidad
  async generarPDF(id: number): Promise<{ mensaje: string }> {
    const rep = await this.findOne(id);
    const msg = rep.generarPDF();
    // aquí en el futuro podrías usar una librería real de PDFs
    return { mensaje: msg };
  }
}
