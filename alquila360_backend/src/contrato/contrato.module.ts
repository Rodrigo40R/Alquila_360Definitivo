// src/contrato/contrato.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContratoController } from './contrato.controller';
import { ContratoService } from './contrato.service';
import { Contrato } from '../entity/contrato/contrato.entity'; 
// NOTA: Se deberán importar Propiedad, Propietario, Inquilino, etc., aquí también.

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Contrato, 
            // Otras entidades que use el ContratoService para validaciones
        ]),
    ],
    controllers: [ContratoController],
    providers: [ContratoService],
    exports: [ContratoService],
})
export class ContratoModule {}