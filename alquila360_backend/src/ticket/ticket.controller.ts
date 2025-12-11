import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { CreateTicketAuthDto } from './dto/create-ticket-auth.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../common/current-user.decorator';
import { TicketInquilinoDto } from './dto/inquilino-tickets.dto';

@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  create(@Body() dto: CreateTicketDto) {
    return this.ticketService.create(dto);
  }

  /**
   * Crear ticket desde inquilino autenticado (JWT)
   * POST /tickets/mis-tickets
   * NOTA: Esta ruta debe estar antes de GET /tickets/:id
   */
  @UseGuards(JwtAuthGuard)
  @Post('mis-tickets')
  createMiTicket(
    @CurrentUser('id_usuario') userId: number,
    @Body() dto: CreateTicketAuthDto,
  ): Promise<TicketInquilinoDto> {
    return this.ticketService.createTicketAuth(userId, dto);
  }

  @Get()
  findAll() {
    return this.ticketService.findAll();
  }

    /**
   * Obtiene los tickets del inquilino autenticado (desde JWT)
   * GET /tickets/mis-tickets
   * NOTA: Esta ruta debe estar antes de GET /tickets/:id
   */
  @UseGuards(JwtAuthGuard)
  @Get('mis-tickets')
  findMisTickets(
    @CurrentUser('id_usuario') userId: number,
  ): Promise<TicketInquilinoDto[]> {
    return this.ticketService.findTicketsByInquilinoAuth(userId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ticketService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTicketDto,
  ) {
    return this.ticketService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ticketService.remove(id);
  }

  @Get('inquilino/:idInquilino')
  findByInquilino(
    @Param('idInquilino', ParseIntPipe) idInquilino: number,
  ) {
    return this.ticketService.findByInquilino(idInquilino);
  }


  @Get('tecnico/:idTecnico')
  findByTecnico(
    @Param('idTecnico', ParseIntPipe) idTecnico: number,
  ) {
    return this.ticketService.findByTecnico(idTecnico);
  }

  // Endpoint opcional para actualizar solo estado/subestado
  @Patch(':id/estado')
  actualizarEstado(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    body: { estado: string; subestado?: string },
  ) {
    return this.ticketService.actualizarEstado(
      id,
      body.estado,
      body.subestado,
    );
  }
}
