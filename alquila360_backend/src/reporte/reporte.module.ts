// src/reporte/reporte.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReporteService } from './reporte.service';
import { ReporteController } from './reporte.controller';

import { Reporte } from '../entity/reporte.entity';
import { REPORTE_REPOSITORY } from './ports/reporte.repo';
import { ReporteTypeOrmRepository } from './adapters/reporte.repo.typeorm';

import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reporte]),
    UserModule, // para poder inyectar el repo de usuarios
  ],
  controllers: [ReporteController],
  providers: [
    ReporteService,
    {
      provide: REPORTE_REPOSITORY,
      useClass: ReporteTypeOrmRepository, // 👈 adiós InMemoryReporteRepository
    },
  ],
  exports: [ReporteService],
})
export class ReporteModule {}
