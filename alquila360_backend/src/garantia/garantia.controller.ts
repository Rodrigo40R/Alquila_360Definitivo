import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GarantiaService } from './garantia.service';
import { CreateGarantiaDto } from './dto/create-garantia.dto';
import { UpdateGarantiaDto } from './dto/update-garantia.dto';

@Controller('garantia') 
export class GarantiaController {
    constructor(private readonly garantiaService: GarantiaService) {}

    @Post()
    create(@Body() createGarantiaDto: CreateGarantiaDto) {
        return this.garantiaService.create(createGarantiaDto);
    }

    @Get()
    findAll() {
        return this.garantiaService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.garantiaService.findOne(+id); // Convierte string a número
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateGarantiaDto: UpdateGarantiaDto) {
        return this.garantiaService.update(+id, updateGarantiaDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.garantiaService.remove(+id);
    }
}