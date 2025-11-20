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
import { EvaluacionService } from './evaluacion.service';
import { CreateEvaluacionDto } from './dto/create-evaluacion.dto';
import { UpdateEvaluacionDto } from './dto/update-evaluacion.dto';

@Controller('evaluaciones')
export class EvaluacionController {
  constructor(private readonly evaluacionService: EvaluacionService) {}

  @Post()
  create(@Body() dto: CreateEvaluacionDto) {
    return this.evaluacionService.create(dto);
  }

  @Get()
  findAll() {
    return this.evaluacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.evaluacionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateEvaluacionDto,
  ) {
    return this.evaluacionService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.evaluacionService.remove(id);
  }

  @Get('ticket/:idTicket')
  findByTicket(@Param('idTicket', ParseIntPipe) idTicket: number) {
    return this.evaluacionService.findByTicket(idTicket);
  }
}
