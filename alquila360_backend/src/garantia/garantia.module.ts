import { Module } from '@nestjs/common';
import { GarantiaService } from './garantia.service';
import { GarantiaController } from './garantia.controller';
import { InMemoryGarantiaRepository } from './adapters/garantia.repo.memory';
import { GarantiaRepositoryPort } from './ports/garantia.repo';

@Module({
  imports: [],
  controllers: [GarantiaController],
  providers: [
    GarantiaService,
    {
      provide: GarantiaRepositoryPort,
      useClass: InMemoryGarantiaRepository,
    },
  ],
  exports: [GarantiaService, GarantiaRepositoryPort],
})
export class GarantiaModule {}
