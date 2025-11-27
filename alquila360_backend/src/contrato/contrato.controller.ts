// src/contrato/contrato.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContratoService } from './contrato.service';
import { CreateContratoDto } from './dto/create-contrato.dto';
import { UpdateContratoDto } from './dto/update-contrato.dto';

@Controller('contrato') // 👈 OJO A ESTE PATH
export class ContratoController {
  constructor(private readonly contratoService: ContratoService) {}

  @Post()
  create(@Body() dto: CreateContratoDto) {
    return this.contratoService.create(dto);
  }

  @Get()
  findAll() {
    return this.contratoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contratoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateContratoDto) {
    return this.contratoService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contratoService.remove(+id);
  }

  @Get('propietario/:idPropietario')
  findByPropietario(@Param('idPropietario') id: string) {
    return this.contratoService.findByPropietario(+id);
  }

  @Get('inquilino/:idInquilino')
  findByInquilino(@Param('idInquilino') id: string) {
    return this.contratoService.findByInquilino(+id);
  }
}
