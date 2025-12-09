// src/ticket/ticket.service.ts
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from '../entity/ticket.entity';

import { TICKET_REPOSITORY } from './ports/ticket.repo';
import type { TicketRepositoryPort } from './ports/ticket.repo';

import { USER_REPOSITORY } from '../user/ports/user.repo';
import type { UserRepositoryPort } from '../user/ports/user.repo';

import { Inquilino } from '../entity/inquilino.entity';
import { Tecnico } from '../entity/tecnico.entity';

// 👉 DTOs del dashboard de técnico
import {
  TecnicoDashboardDto,
  TicketResumenTecnicoDto,
  TicketEstadoFront,
  TicketPrioridadFront,
} from './dto/tecnico-dashboard.dto';

@Injectable()
export class TicketService {
  constructor(
    @Inject(TICKET_REPOSITORY)
    private readonly ticketRepo: TicketRepositoryPort,

    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepositoryPort,
  ) {}

  async create(dto: CreateTicketDto): Promise<Ticket> {
    // 1) validar inquilino
    const inquilinoUser = await this.userRepo.findOne(dto.id_inquilino);
    if (!inquilinoUser) {
      throw new NotFoundException(
        `Inquilino con id ${dto.id_inquilino} no encontrado`,
      );
    }
    if (inquilinoUser.tipo_usuario !== 'INQUILINO') {
      throw new BadRequestException(
        `El usuario ${dto.id_inquilino} no es un INQUILINO`,
      );
    }
    const inquilino = inquilinoUser as Inquilino;

    // 2) validar técnico (si viene)
    let tecnico: Tecnico | null = null;
    if (dto.id_tecnico !== undefined) {
      const tecnicoUser = await this.userRepo.findOne(dto.id_tecnico);
      if (!tecnicoUser) {
        throw new NotFoundException(
          `Técnico con id ${dto.id_tecnico} no encontrado`,
        );
      }
      if (tecnicoUser.tipo_usuario !== 'TECNICO') {
        throw new BadRequestException(
          `El usuario ${dto.id_tecnico} no es un TECNICO`,
        );
      }
      tecnico = tecnicoUser as Tecnico;
    }

    const ticket = new Ticket();
    ticket.descripcion = dto.descripcion;
    ticket.prioridad = dto.prioridad;
    ticket.estado = dto.estado;
    ticket.subestado = dto.subestado;
    ticket.inquilino = inquilino;
    ticket.tecnico = tecnico;

    return this.ticketRepo.create(ticket);
  }

  async findAll(): Promise<Ticket[]> {
    return this.ticketRepo.findAll();
  }

  async findOne(id: number): Promise<Ticket> {
    const ticket = await this.ticketRepo.findOne(id);
    if (!ticket) {
      throw new NotFoundException(`Ticket con id ${id} no encontrado`);
    }
    return ticket;
  }

  async update(id: number, dto: UpdateTicketDto): Promise<Ticket> {
    const ticket = await this.findOne(id);

    // posibilidad de reasignar técnico
    let tecnico = ticket.tecnico;
    if (dto.id_tecnico !== undefined) {
      const tecnicoUser = await this.userRepo.findOne(dto.id_tecnico);
      if (!tecnicoUser) {
        throw new NotFoundException(
          `Técnico con id ${dto.id_tecnico} no encontrado`,
        );
      }
      if (tecnicoUser.tipo_usuario !== 'TECNICO') {
        throw new BadRequestException(
          `El usuario ${dto.id_tecnico} no es un TECNICO`,
        );
      }
      tecnico = tecnicoUser as Tecnico;
    }

    const partial: Partial<Ticket> = {
      descripcion: dto.descripcion,
      prioridad: dto.prioridad,
      estado: dto.estado,
      subestado: dto.subestado,
      tecnico,
    };

    return this.ticketRepo.update(id, partial);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    return this.ticketRepo.remove(id);
  }

  async findByInquilino(idInquilino: number): Promise<Ticket[]> {
    const user = await this.userRepo.findOne(idInquilino);
    if (!user || user.tipo_usuario !== 'INQUILINO') {
      throw new NotFoundException(
        `Inquilino con id ${idInquilino} no encontrado`,
      );
    }
    return this.ticketRepo.findByInquilino(idInquilino);
  }

  async findByTecnico(idTecnico: number): Promise<Ticket[]> {
    const user = await this.userRepo.findOne(idTecnico);
    if (!user || user.tipo_usuario !== 'TECNICO') {
      throw new NotFoundException(
        `Técnico con id ${idTecnico} no encontrado`,
      );
    }
    return this.ticketRepo.findByTecnico(idTecnico);
  }

  // opcional: método específico para actualizar estado usando la lógica de la entidad
  async actualizarEstado(
    id: number,
    estado: string,
    subestado?: string,
  ): Promise<Ticket> {
    const ticket = await this.findOne(id);
    ticket.actualizarEstado(estado, subestado);
    return this.ticketRepo.update(id, ticket);
  }

  // ---------------------------------------------------------
  // 🔥 NUEVA LÓGICA: DASHBOARD DEL TÉCNICO
  // ---------------------------------------------------------

  /** Normaliza el estado de la BD a los valores esperados por el front */
  private mapEstadoBackToFront(estado: string): TicketEstadoFront {
    const normalized = (estado || '').toUpperCase();
    if (normalized === 'PENDIENTE') return 'pendiente';
    if (normalized === 'EN_PROCESO') return 'en_proceso';
    // cualquier otro lo tratamos como resuelto
    return 'resuelto';
  }

  /** Normaliza la prioridad de la BD a los valores esperados por el front */
  private mapPrioridadBackToFront(prioridad: string): TicketPrioridadFront {
    const normalized = (prioridad || '').toUpperCase();
    if (normalized === 'ALTA') return 'alta';
    if (normalized === 'MEDIA') return 'media';
    return 'baja';
  }

  /** Formatea una fecha a dd/MM/yyyy (si viene como Date o string ISO) */
  private formatFecha(fechaRaw: any): string {
    if (!fechaRaw) return '';

    let d: Date;
    if (fechaRaw instanceof Date) {
      d = fechaRaw;
    } else {
      const parsed = new Date(fechaRaw);
      if (isNaN(parsed.getTime())) return String(fechaRaw);
      d = parsed;
    }

    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }

  /**
   * Dashboard de técnico:
   * - tickets asignados al técnico
   * - ticket seleccionado por defecto
   * - contadores de pendientes y en proceso
   */
  async getDashboardTecnico(idTecnico: number): Promise<TecnicoDashboardDto> {
    // Reutilizamos la lógica de validación y búsqueda que ya tienes
    const tickets = await this.findByTecnico(idTecnico);

    const ticketsAsignados: TicketResumenTecnicoDto[] = tickets.map((t) => {
      // Sacamos fecha (ajusta el nombre de la columna según tu entidad real)
      const fechaRaw =
        (t as any).fecha_creacion ?? (t as any).fecha ?? null;
      const fecha = this.formatFecha(fechaRaw);

      // Dirección y departamento desde el inquilino
      const inq: any = t.inquilino || {};
      const direccion = inq.direccion ?? '';
      const departamento = inq.departamento ?? '';

      const estadoFront = this.mapEstadoBackToFront(t.estado);
      const prioridadFront = this.mapPrioridadBackToFront(t.prioridad);

      return {
        id: t.id_ticket,
        problema: t.descripcion,
        fecha,
        estado: estadoFront,
        detalle: t.descripcion,
        direccion,
        departamento,
        prioridad: prioridadFront,
      };
    });

    const ticketsPendientes = ticketsAsignados.filter(
      (t) => t.estado === 'pendiente',
    );
    const ticketsEnProceso = ticketsAsignados.filter(
      (t) => t.estado === 'en_proceso',
    );

    // Misma lógica que tu front: primero pendiente + alta prioridad,
    // luego cualquier pendiente, luego en proceso, luego el primero
    const ticketSeleccionado =
      ticketsPendientes.find((t) => t.prioridad === 'alta') ??
      ticketsPendientes[0] ??
      ticketsEnProceso[0] ??
      ticketsAsignados[0] ??
      null;

    return {
      ticketSeleccionado,
      ticketsAsignados,
      ticketsEnProceso: ticketsEnProceso.length,
      ticketsPendientes: ticketsPendientes.length,
    };
  }
}
