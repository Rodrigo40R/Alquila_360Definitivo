import { Module } from '@nestjs/common';
import { ContratoService } from './contrato.service';
import { ContratoController } from './contrato.controller';
import { InMemoryContratoRepository } from './adapters/contrato.repo.memory';
import { ContratoRepositoryPort } from './ports/contrato.repo';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [ContratoController],
  providers: [
    ContratoService,
    {
      provide: ContratoRepositoryPort,
      useClass: InMemoryContratoRepository,
    },
  ],
  exports: [ContratoService, ContratoRepositoryPort],
})
export class ContratoModule {}
