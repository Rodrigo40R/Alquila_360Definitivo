// src/garantia/garantia.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GarantiaService } from './garantia.service';
import { GarantiaController } from './garantia.controller';

import { Garantia } from '../entity/garantia.entity';
import { GARANTIA_REPOSITORY } from './ports/garantia.repo';
import { GarantiaTypeOrmRepository } from './adapters/garantia.repo.typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Garantia])],
  controllers: [GarantiaController],
  providers: [
    GarantiaService,
    {
      provide: GARANTIA_REPOSITORY,
      useClass: GarantiaTypeOrmRepository, // 👈 ya no usamos InMemoryGarantiaRepository
    },
  ],
  exports: [GarantiaService],
})
export class GarantiaModule {}
