// src/contrato/contrato.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContratoController } from './contrato.controller';
import { ContratoService } from './contrato.service';
import { Contrato } from '../entity/contrato.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Contrato,
      // aquí podrías añadir otras entidades relacionadas si las usas
    ]),
  ],
  controllers: [ContratoController],
  providers: [ContratoService],
  exports: [ContratoService],
})
export class ContratoModule {}
