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
import { ReporteService } from './reporte.service';
import { CreateReporteDto } from './dto/create-reporte.dto';
import { UpdateReporteDto } from './dto/update-reporte.dto';

@Controller('reportes')
export class ReporteController {
  constructor(private readonly reporteService: ReporteService) {}

  @Post()
  create(@Body() dto: CreateReporteDto) {
    return this.reporteService.create(dto);
  }

  @Get()
  findAll() {
    return this.reporteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reporteService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateReporteDto,
  ) {
    return this.reporteService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.reporteService.remove(id);
  }

  @Get('administrador/:idAdmin')
  findByAdministrador(
    @Param('idAdmin', ParseIntPipe) idAdmin: number,
  ) {
    return this.reporteService.findByAdministrador(idAdmin);
  }

  // Endpoint para "generar" el PDF
  @Get(':id/pdf')
  generarPDF(@Param('id', ParseIntPipe) id: number) {
    return this.reporteService.generarPDF(id);
  }
}
