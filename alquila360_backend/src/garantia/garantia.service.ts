import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Garantia } from '../entity/garantia/garantia.entity';
//import { Contrato } from '../entity/contrato/contrato.entity'; (lo mismo que en otro, cuando se cree contrato, este codigo se activa)
import { CreateGarantiaDto } from './dto/create-garantia.dto';
import { UpdateGarantiaDto } from './dto/update-garantia.dto';

@Injectable()
export class GarantiaService {
    constructor(
        @InjectRepository(Garantia) 
        private garantiaRepository: Repository<Garantia>,
        
        @InjectRepository(Contrato)
        private contratoRepository: Repository<Contrato>,
    ) {}

    async create(createGarantiaDto: CreateGarantiaDto): Promise<Garantia> {
        // En un servicio real, se verifica si el contratoId existe.
        const contrato = await this.contratoRepository.findOne({ where: { id_contrato: createGarantiaDto.contratoId } });
        if (!contrato) {
            throw new NotFoundException(`Contrato con ID ${createGarantiaDto.contratoId} no encontrado.`);
        }
        
        // 1. Crear y guardar la garantía
        const nuevaGarantia = this.garantiaRepository.create({
            monto: createGarantiaDto.monto,
            descripcion: createGarantiaDto.descripcion,
        });
        const garantiaGuardada = await this.garantiaRepository.save(nuevaGarantia);

        // 2. Asociar la garantía al contrato (esto actualiza la FK en Contrato)
        contrato.garantia = garantiaGuardada;
        await this.contratoRepository.save(contrato);

        return garantiaGuardada;
    }
    
    // Métodos find/update/remove (CRUD básicos)
    findAll(): Promise<Garantia[]> {
        return this.garantiaRepository.find();
    }
    
    async findOne(id: number): Promise<Garantia> {
        const garantia = await this.garantiaRepository.findOne({ where: { id_garantia: id } });
        if (!garantia) {
            throw new NotFoundException(`Garantía con ID ${id} no encontrada.`);
        }
        return garantia;
    }

    async update(id: number, updateGarantiaDto: UpdateGarantiaDto): Promise<Garantia> {
        const resultado = await this.garantiaRepository.update(id, updateGarantiaDto);
        if (resultado.affected === 0) {
            throw new NotFoundException(`Garantía con ID ${id} no encontrada para actualizar.`);
        }
        return this.findOne(id);
    }
    
    async remove(id: number): Promise<void> {
        const resultado = await this.garantiaRepository.delete(id);
        if (resultado.affected === 0) {
            throw new NotFoundException(`Garantía con ID ${id} no encontrada.`);
        }
    }
}