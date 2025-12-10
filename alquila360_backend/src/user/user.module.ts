// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserService } from './user.service';

import { User } from '../entity/user.entity';
import { Contrato } from '../entity/contrato.entity';
import { Cuota } from '../entity/cuota.entity';
import { Multa } from '../entity/multa.entity';

import { USER_REPOSITORY } from './ports/user.repo';
import { UserTypeOrmRepository } from './adapters/user.repo.typeorm';
import { CONTRATO_REPOSITORY } from '../contrato/ports/contrato.repo';
import { ContratoTypeOrmRepository } from '../contrato/adapters/contrato.repo.typeorm';
import { CUOTA_REPOSITORY } from '../cuota/ports/cuota.repo';
import { CuotaTypeOrmRepository } from '../cuota/adapters/cuota.repo.typeorm';
import { MULTA_REPOSITORY } from '../multa/ports/multa.repo';
import { MultaTypeOrmRepository } from '../multa/adapters/multa.repo.typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User, Contrato, Cuota, Multa])],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: USER_REPOSITORY,
      useClass: UserTypeOrmRepository,
    },
    {
      provide: CONTRATO_REPOSITORY,
      useClass: ContratoTypeOrmRepository,
    },
    {
      provide: CUOTA_REPOSITORY,
      useClass: CuotaTypeOrmRepository,
    },
    {
      provide: MULTA_REPOSITORY,
      useClass: MultaTypeOrmRepository,
    },
  ],
  exports: [
    UserService,
    USER_REPOSITORY,
    CONTRATO_REPOSITORY,
    CUOTA_REPOSITORY,
    MULTA_REPOSITORY,
  ],
})
export class UserModule {}
