import { Module } from '@nestjs/common';
import { EvaluacionService } from './evaluacion.service';
import { EvaluacionController } from './evaluacion.controller';
import { InMemoryEvaluacionRepository } from './adapters/evaluacion.repo.memory';
import { EvaluacionRepositoryPort } from './ports/evaluacion.repo';
import { TicketModule } from '../ticket/ticket.module';

@Module({
  imports: [TicketModule],
  controllers: [EvaluacionController],
  providers: [
    EvaluacionService,
    {
      provide: EvaluacionRepositoryPort,
      useClass: InMemoryEvaluacionRepository,
    },
  ],
  exports: [EvaluacionService, EvaluacionRepositoryPort],
})
export class EvaluacionModule {}
