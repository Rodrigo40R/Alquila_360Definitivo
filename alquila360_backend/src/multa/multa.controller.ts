import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { MultaService } from './multa.service';
import { CreateMultaDto } from './dto/create-multa.dto';
import { UpdateMultaDto } from './dto/update-multa.dto';

@Controller('multas')
export class MultaController {
  constructor(private readonly multaService: MultaService) {}

  @Post()
  create(@Body() dto: CreateMultaDto) {
    return this.multaService.create(dto);
  }

  @Get()
  findAll() {
    return this.multaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.multaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateMultaDto) {
    return this.multaService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.multaService.remove(id);
  }

  @Get('contrato/:idContrato')
  findByContrato(@Param('idContrato', ParseIntPipe) idContrato: number) {
    return this.multaService.findByContrato(idContrato);
  }

  @Patch(':id/anular')
  anularMulta(@Param('id', ParseIntPipe) id: number) {
    return this.multaService.anularMulta(id);
  }
}
