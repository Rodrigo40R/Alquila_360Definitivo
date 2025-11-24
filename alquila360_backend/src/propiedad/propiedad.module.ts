// src/propiedad/propiedad.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PropiedadService } from './propiedad.service';
import { PropiedadController } from './propiedad.controller';

import { Propiedad } from '../entity/propiedad.entity';
import { PROPIEDAD_REPOSITORY } from './ports/propiedad.repo';
import { PropiedadTypeOrmRepository } from './adapters/propiedad.repo.typeorm';

import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Propiedad]),
    UserModule,
  ],
  controllers: [PropiedadController],
  providers: [
    PropiedadService,
    {
      provide: PROPIEDAD_REPOSITORY,
      useClass: PropiedadTypeOrmRepository, // 👈 ya no usamos InMemoryPropiedadRepository
    },
  ],
  exports: [PropiedadService],
})
export class PropiedadModule {}
