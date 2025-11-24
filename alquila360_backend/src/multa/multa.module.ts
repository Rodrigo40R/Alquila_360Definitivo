// src/multa/multa.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MultaService } from './multa.service';
import { MultaController } from './multa.controller';

import { Multa } from '../entity/multa.entity';
import { MULTA_REPOSITORY } from './ports/multa.repo';
import { MultaTypeOrmRepository } from './adapters/multa.repo.typeorm';

import { ContratoModule } from '../contrato/contrato.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Multa]),
    ContratoModule, // para poder inyectar ContratoService
  ],
  controllers: [MultaController],
  providers: [
    MultaService,
    {
      provide: MULTA_REPOSITORY,
      useClass: MultaTypeOrmRepository, // 👈 ya no usamos InMemoryMultaRepository
    },
  ],
  exports: [MultaService],
})
export class MultaModule {}
