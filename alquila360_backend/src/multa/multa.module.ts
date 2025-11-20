import { Module } from '@nestjs/common';
import { MultaService } from './multa.service';
import { MultaController } from './multa.controller';
import { InMemoryMultaRepository } from './adapters/multa.repo.memory';
import { MultaRepositoryPort } from './ports/multa.repo';
import { ContratoModule } from '../contrato/contrato.module';

@Module({
  imports: [ContratoModule],
  controllers: [MultaController],
  providers: [
    MultaService,
    {
      provide: MultaRepositoryPort,
      useClass: InMemoryMultaRepository,
    },
  ],
  exports: [MultaService, MultaRepositoryPort],
})
export class MultaModule {}
