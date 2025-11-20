import { Module } from '@nestjs/common';
import { PagoService } from './pago.service';
import { PagoController } from './pago.controller';
import { InMemoryPagoRepository } from './adapters/pago.repo.memory';
import { PagoRepositoryPort } from './ports/pago.repo';
import { CuotaModule } from '../cuota/cuota.module';

@Module({
  imports: [CuotaModule],
  controllers: [PagoController],
  providers: [
    PagoService,
    {
      provide: PagoRepositoryPort,
      useClass: InMemoryPagoRepository,
    },
  ],
  exports: [PagoService, PagoRepositoryPort],
})
export class PagoModule {}
