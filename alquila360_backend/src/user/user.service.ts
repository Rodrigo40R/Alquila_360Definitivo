// src/user/user.service.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InquilinoDashboardDto, CuotaDto, MultaDto } from './dto/inquilino-dashboard.dto';

// 👇 Tokens de inyección de repositorios
import { USER_REPOSITORY } from './ports/user.repo';
import { CONTRATO_REPOSITORY } from '../contrato/ports/contrato.repo';
import { CUOTA_REPOSITORY } from '../cuota/ports/cuota.repo';
import { MULTA_REPOSITORY } from '../multa/ports/multa.repo';

// 👇 Solo tipos para TypeScript
import type { UserRepositoryPort } from './ports/user.repo';
import type { ContratoRepositoryPort } from '../contrato/ports/contrato.repo';
import type { CuotaRepositoryPort } from '../cuota/ports/cuota.repo';
import type { MultaRepositoryPort } from '../multa/ports/multa.repo';

import { User } from '../entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepositoryPort,
    @Inject(CONTRATO_REPOSITORY)
    private readonly contratoRepo: ContratoRepositoryPort,
    @Inject(CUOTA_REPOSITORY)
    private readonly cuotaRepo: CuotaRepositoryPort,
    @Inject(MULTA_REPOSITORY)
    private readonly multaRepo: MultaRepositoryPort,
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
   * 
   * Retorna un array con 2 cuotas:
   * [0] = cuota vencida más reciente (con multa si aplica)
   * [1] = próxima cuota a vencer
   */
  async getInquilinoDashboard(userId: number): Promise<InquilinoDashboardDto> {
    // 1. Validar que el usuario existe
    const user = await this.userRepo.findOne(userId);
    if (!user) {
      throw new NotFoundException(`Usuario con id ${userId} no encontrado`);
    }

    // 2. Buscar contratos del inquilino
    const contratos = await this.contratoRepo.findByInquilino(userId);
    if (contratos.length === 0) {
      // Si no hay contratos, devolver array vacío
      return {
        cuotas: [null, null],
        ticketsActivos: 0,
      };
    }

    // 3. Usar el primer contrato activo (o el más reciente)
    const contrato = contratos[0];

    // 4. Obtener todas las cuotas del contrato
    const cuotas = await this.cuotaRepo.findByContrato(contrato.id_contrato);

    // 5. Ordenar cuotas por fecha de vencimiento
    const cuotasOrdenadas = cuotas.sort(
      (a, b) => new Date(a.fecha_vencimiento).getTime() - new Date(b.fecha_vencimiento).getTime()
    );

    const hoy = new Date();

    // 6. Filtrar: cuota próxima (vence en el futuro) y cuota vencida (vencio en el pasado)
    const proximaCuota = cuotasOrdenadas.find(
      (c) => new Date(c.fecha_vencimiento) >= hoy
    );
    const cuotasVencidas = cuotasOrdenadas.filter(
      (c) => new Date(c.fecha_vencimiento) < hoy
    );
    const cuotaVencidaReciente = cuotasVencidas.length > 0 
      ? cuotasVencidas[cuotasVencidas.length - 1] // la más vencida recientemente
      : null;

    // 7. Convertir a DTOs, buscando multas si aplica
    const cuotaVencidaDto = cuotaVencidaReciente
      ? await this.mapearCuotaADto(cuotaVencidaReciente, contrato.monto_mensual)
      : null;

    const proximaCuotaDto = proximaCuota
      ? await this.mapearCuotaADto(proximaCuota, contrato.monto_mensual)
      : null;

    // 8. TODO: obtener cantidad de tickets activos del inquilino
    const ticketsActivos = 0; // placeholder

    return {
      cuotas: [cuotaVencidaDto, proximaCuotaDto],
      ticketsActivos,
    };
  }

  /**
   * Mapea una Cuota a CuotaDto, incluyendo multa si existe
   */
  private async mapearCuotaADto(cuota: any, alquilerPropiedad: number): Promise<CuotaDto> {
    // Buscar multa asociada a esta cuota
    let multa: MultaDto | null = null;

    const multas = await this.multaRepo.findByContrato((cuota.contrato as any)?.id_contrato || 0);
    const multaAsociada = multas.find((m) => (m.cuota as any)?.id_cuota === cuota.id_cuota);

    if (multaAsociada) {
      multa = {
        id_multa: multaAsociada.id_multa,
        tipo: multaAsociada.tipo,
        monto: Number(multaAsociada.monto),
        fecha: multaAsociada.fecha.toString(),
        estado: multaAsociada.estado,
        descripcion: multaAsociada.descripcion,
      };
    }

    return {
      id_cuota: cuota.id_cuota,
      monto: Number(cuota.monto),
      fecha_vencimiento: cuota.fecha_vencimiento.toString(),
      estado: cuota.estado,
      alquilerPropiedad,
      multa,
    };
  }
}
