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
import { PropiedadService } from './propiedad.service';
import { CreatePropiedadDto } from './dto/create-propiedad.dto';
import { UpdatePropiedadDto } from './dto/update-propiedad.dto';

@Controller('propiedades')
export class PropiedadController {
  constructor(private readonly propiedadService: PropiedadService) {}

  @Post()
  create(@Body() dto: CreatePropiedadDto) {
    return this.propiedadService.create(dto);
  }

  @Get()
  findAll() {
    return this.propiedadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.propiedadService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePropiedadDto,
  ) {
    return this.propiedadService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.propiedadService.remove(id);
  }

  @Get('propietario/:idPropietario')
  findByPropietario(
    @Param('idPropietario', ParseIntPipe) idPropietario: number,
  ) {
    return this.propiedadService.findByPropietario(idPropietario);
  }
}
