// src/pago/pago.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PagoService } from './pago.service';
import { PagoController } from './pago.controller';

import { Pago } from '../entity/pago.entity';
import { PAGO_REPOSITORY } from './ports/pago.repo';
import { PagoTypeOrmRepository } from './adapters/pago.repo.typeorm';

import { CuotaModule } from '../cuota/cuota.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pago]),
    CuotaModule, // para poder inyectar CuotaService
  ],
  controllers: [PagoController],
  providers: [
    PagoService,
    {
      provide: PAGO_REPOSITORY,
      useClass: PagoTypeOrmRepository, // 👈 ya no usamos InMemoryPagoRepository
    },
  ],
  exports: [PagoService],
})
export class PagoModule {}
