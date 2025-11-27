// src/user/user.service.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InquilinoDashboardDto } from './dto/inquilino-dashboard.dto';

// 👇 Token de inyección del repositorio
import { USER_REPOSITORY } from './ports/user.repo';

// 👇 Solo es tipo, para TypeScript
import type { UserRepositoryPort } from './ports/user.repo';

import { User } from '../entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepositoryPort,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepo.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.userRepo.findAll();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepo.findOne(id);
    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    return user;
  }

  async findByCorreo(correo: string): Promise<User | null> {
    return this.userRepo.findByCorreo(correo);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const existing = await this.userRepo.findOne(id);
    if (!existing) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    return this.userRepo.update(id, updateUserDto);
  }

  async remove(id: number): Promise<void> {
    const existing = await this.userRepo.findOne(id);
    if (!existing) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    return this.userRepo.remove(id);
  }

  /**
   * Datos del dashboard del inquilino a partir del id de usuario.
   */
  async getInquilinoDashboard(userId: number): Promise<InquilinoDashboardDto> {
    // 1. Buscar usuario usando el repositorio inyectado
    const user = await this.userRepo.findOne(userId);

    if (!user) {
      throw new NotFoundException(`Usuario con id ${userId} no encontrado`);
    }

    // (OPCIONAL) validar que sea inquilino según tu modelo
    // if (user.tipo_usuario !== 'INQUILINO') {
    //   throw new ForbiddenException('El usuario no es un inquilino');
    // }

    // 2. TODO: aquí deberías consultar contratos, cuotas/pagos, tickets, etc.
    //    De momento dejamos datos mock para que el endpoint funcione
    //    y puedas conectar el frontend y defender la idea.

    const proximoPago = '2026-02-12'; // TODO: calcular desde la tabla cuotas
    const montoMensual = 350;         // TODO: sacar del contrato activo
    const ticketsActivos = 2;         // TODO: contar tickets con estado ABIERTO

    const ultimosPagos = [
      {
        monto: 350,
        fecha: new Date().toISOString(),
        estado: 'PAGADO',
      },
      {
        monto: 350,
        fecha: new Date('2025-10-27').toISOString(),
        estado: 'PAGADO',
      },
      {
        monto: 350,
        fecha: new Date('2025-09-27').toISOString(),
        estado: 'PAGADO',
      },
    ];

    const dto: InquilinoDashboardDto = {
      proximoPago,
      montoMensual,
      ticketsActivos,
      ultimosPagos,
    };

    return dto;
  }
}
