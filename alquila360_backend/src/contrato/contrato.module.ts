// src/contrato/contrato.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContratoService } from './contrato.service';
import { ContratoController } from './contrato.controller';

import { Contrato } from '../entity/contrato.entity';
import { CONTRATO_REPOSITORY } from './ports/contrato.repo';
import { ContratoTypeOrmRepository } from './adapters/contrato.repo.typeorm';

import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contrato]),
    UserModule, // para poder inyectar USER_REPOSITORY en el servicio
  ],
  controllers: [ContratoController],
  providers: [
    ContratoService,
    {
      provide: CONTRATO_REPOSITORY,
      useClass: ContratoTypeOrmRepository,
    },
  ],
  exports: [ContratoService],
})
export class ContratoModule {}
