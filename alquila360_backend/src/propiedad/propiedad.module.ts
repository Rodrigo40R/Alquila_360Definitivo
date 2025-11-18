import { Module } from '@nestjs/common';
import { PropiedadService } from './propiedad.service';
import { PropiedadController } from './propiedad.controller';
import { InMemoryPropiedadRepository } from './adapters/propiedad.repo.memory';
import { PropiedadRepositoryPort } from './ports/propiedad.repo';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [PropiedadController],
  providers: [
    PropiedadService,
    {
      provide: PropiedadRepositoryPort,
      useClass: InMemoryPropiedadRepository,
    },
  ],
  exports: [PropiedadService, PropiedadRepositoryPort],
})
export class PropiedadModule {}
