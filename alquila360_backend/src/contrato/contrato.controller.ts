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
import { ContratoService } from './contrato.service';
import { CreateContratoDto } from './dto/create-contrato.dto';
import { UpdateContratoDto } from './dto/update-contrato.dto';

@Controller('contratos')
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
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.contratoService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateContratoDto,
  ) {
    return this.contratoService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.contratoService.remove(id);
  }

  @Get('propietario/:idPropietario')
  findByPropietario(
    @Param('idPropietario', ParseIntPipe) idPropietario: number,
  ) {
    return this.contratoService.findByPropietario(idPropietario);
  }

  @Get('inquilino/:idInquilino')
  findByInquilino(
    @Param('idInquilino', ParseIntPipe) idInquilino: number,
  ) {
    return this.contratoService.findByInquilino(idInquilino);
  }
}
