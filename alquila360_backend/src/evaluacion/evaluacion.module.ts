// src/evaluacion/evaluacion.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EvaluacionService } from './evaluacion.service';
import { EvaluacionController } from './evaluacion.controller';

import { Evaluacion } from '../entity/evaluacion.entity';
import { EVALUACION_REPOSITORY } from './ports/evaluacion.repo';
import { EvaluacionTypeOrmRepository } from './adapters/evaluacion.repo.typeorm';

import { TicketModule } from '../ticket/ticket.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Evaluacion]),
    TicketModule, // para poder inyectar TicketService
  ],
  controllers: [EvaluacionController],
  providers: [
    EvaluacionService,
    {
      provide: EVALUACION_REPOSITORY,
      useClass: EvaluacionTypeOrmRepository, // 👈 ya no usamos InMemoryEvaluacionRepository
    },
  ],
  exports: [EvaluacionService],
})
export class EvaluacionModule {}
