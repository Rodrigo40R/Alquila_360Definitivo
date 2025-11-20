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
import { CuotaService } from './cuota.service';
import { CreateCuotaDto } from './dto/create-cuota.dto';
import { UpdateCuotaDto } from './dto/update-cuota.dto';

@Controller('cuotas')
export class CuotaController {
  constructor(private readonly cuotaService: CuotaService) {}

  @Post()
  create(@Body() dto: CreateCuotaDto) {
    return this.cuotaService.create(dto);
  }

  @Get()
  findAll() {
    return this.cuotaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cuotaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCuotaDto,
  ) {
    return this.cuotaService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cuotaService.remove(id);
  }

  @Get('contrato/:idContrato')
  findByContrato(@Param('idContrato', ParseIntPipe) idContrato: number) {
    return this.cuotaService.findByContrato(idContrato);
  }
}
