import { Module } from '@nestjs/common';
import { ReporteService } from './reporte.service';
import { ReporteController } from './reporte.controller';
import { InMemoryReporteRepository } from './adapters/reporte.repo.memory';
import { ReporteRepositoryPort } from './ports/reporte.repo';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [ReporteController],
  providers: [
    ReporteService,
    {
      provide: ReporteRepositoryPort,
      useClass: InMemoryReporteRepository,
    },
  ],
  exports: [ReporteService, ReporteRepositoryPort],
})
export class ReporteModule {}
