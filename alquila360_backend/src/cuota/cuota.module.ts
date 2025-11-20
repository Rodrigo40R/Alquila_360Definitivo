import { Module } from '@nestjs/common';
import { CuotaService } from './cuota.service';
import { CuotaController } from './cuota.controller';
import { InMemoryCuotaRepository } from './adapters/cuota.repo.memory';
import { CuotaRepositoryPort } from './ports/cuota.repo';
import { ContratoModule } from '../contrato/contrato.module';

@Module({
  imports: [ContratoModule],
  controllers: [CuotaController],
  providers: [
    CuotaService,
    {
      provide: CuotaRepositoryPort,
      useClass: InMemoryCuotaRepository,
    },
  ],
  exports: [CuotaService, CuotaRepositoryPort],
})
export class CuotaModule {}
