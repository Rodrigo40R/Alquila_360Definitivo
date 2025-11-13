import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TicketRepositoryPort } from './ports/ticket.repo';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from '../entity/ticket.entity';
import { UserRepositoryPort } from '../user/ports/user.repo';
import { Inquilino } from '../entity/inquilino.entity';
import { Tecnico } from '../entity/tecnico.entity';

@Injectable()
export class TicketService {
  constructor(
    private readonly ticketRepo: TicketRepositoryPort,
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
}
