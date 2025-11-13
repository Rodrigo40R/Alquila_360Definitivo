// src/contrato/contrato.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contrato } from '../entity/contrato/contrato.entity';
import { CreateContratoDto } from './dto/create-contrato.dto';
import { UpdateContratoDto } from './dto/update-contrato.dto';
// Importaciones de otras entidades que se necesitarán para validaciones (comentadas temporalmente)
// import { Propiedad } from '../entity/propiedad/propiedad.entity'; 

@Injectable()
export class ContratoService {
    constructor(
        @InjectRepository(Contrato) 
        private contratoRepository: Repository<Contrato>,
        // Inyección de otros repositorios (Propiedad, Propietario, Inquilino...) iría aquí
    ) {}

    async create(createContratoDto: CreateContratoDto): Promise<Contrato> {
        // NOTA: Cuando las otras entidades existan, aquí se debe:
        // 1. Buscar y verificar que Propiedad, Propietario e Inquilino existan.
        // 2. Verificar que la propiedad no tenga un contrato activo.
        
        const nuevoContrato = this.contratoRepository.create({
            ...createContratoDto,
            // Convertir fechas de string (del DTO) a objetos Date
            fecha_inicio: new Date(createContratoDto.fecha_inicio),
            fecha_fin: new Date(createContratoDto.fecha_fin),
            // Las relaciones se asociarían aquí (ej: propiedad: propiedadEncontrada)
        });
        
        return this.contratoRepository.save(nuevoContrato);
    }

    findAll(): Promise<Contrato[]> {
        // Carga relaciones esenciales para listar
        return this.contratoRepository.find({ 
            relations: ['propiedad', 'propietario', 'inquilino'] 
        });
    }

    async findOne(id: number): Promise<Contrato> {
        // Carga todas las relaciones para una vista detallada
        const contrato = await this.contratoRepository.findOne({ 
            where: { id_contrato: id },
            relations: ['propiedad', 'propietario', 'inquilino', 'garantia', 'cuotas', 'multasAsociadas']
        });
        if (!contrato) {
            throw new NotFoundException(`Contrato con ID ${id} no encontrado.`);
        }
        return contrato;
    }
    
    async update(id: number, updateContratoDto: UpdateContratoDto): Promise<Contrato> {
        // Se aplica el update parcial y luego se retorna la entidad actualizada
        await this.contratoRepository.update(id, updateContratoDto);
        return this.findOne(id);
    }
    
    async remove(id: number): Promise<void> {
        const resultado = await this.contratoRepository.delete(id);
        if (resultado.affected === 0) {
             throw new NotFoundException(`Contrato con ID ${id} no encontrado para eliminar.`);
        }
    }
}