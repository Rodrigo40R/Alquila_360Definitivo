// src/cuota/cuota.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CuotaService } from './cuota.service';
import { CuotaController } from './cuota.controller';

import { Cuota } from '../entity/cuota.entity';
import { CUOTA_REPOSITORY } from './ports/cuota.repo';
import { CuotaTypeOrmRepository } from './adapters/cuota.repo.typeorm';

import { ContratoModule } from '../contrato/contrato.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cuota]),
    ContratoModule, // para poder inyectar ContratoService
  ],
  controllers: [CuotaController],
  providers: [
    CuotaService,
    {
      provide: CUOTA_REPOSITORY,
      useClass: CuotaTypeOrmRepository, // 👈 ya no usamos InMemoryCuotaRepository
    },
  ],
  exports: [CuotaService],
})
export class CuotaModule {}
