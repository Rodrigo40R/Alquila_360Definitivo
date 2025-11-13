import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  create(@Body() dto: CreateTicketDto) {
    return this.ticketService.create(dto);
  }

  @Get()
  findAll() {
    return this.ticketService.findAll();
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
