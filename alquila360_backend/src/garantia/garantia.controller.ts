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
import { GarantiaService } from './garantia.service';
import { CreateGarantiaDto } from './dto/create-garantia.dto';
import { UpdateGarantiaDto } from './dto/update-garantia.dto';

@Controller('garantias')
export class GarantiaController {
  constructor(private readonly garantiaService: GarantiaService) {}

  @Post()
  create(@Body() dto: CreateGarantiaDto) {
    return this.garantiaService.create(dto);
  }

  @Get()
  findAll() {
    return this.garantiaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.garantiaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateGarantiaDto,
  ) {
    return this.garantiaService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.garantiaService.remove(id);
  }

  // endpoint para usar parte de la garantía para daños
  @Patch(':id/usar-danos')
  usarParaDanos(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { montoDano: number },
  ) {
    return this.garantiaService.usarParaDanos(id, body.montoDano);
  }
}
