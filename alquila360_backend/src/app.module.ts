// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './user/user.module';
import { PropiedadModule } from './propiedad/propiedad.module';
import { GarantiaModule } from './garantia/garantia.module';
import { ContratoModule } from './contrato/contrato.module';
// Si usas TypeORM, sería algo así:
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { dataSourceOptions } from './data-source';

@Module({
  imports: [
    // TypeOrmModule.forRoot(dataSourceOptions), // cuando tengas tu configuración lista
    UserModule,
    PropiedadModule,
    GarantiaModule,
    ContratoModule, // <-- aquí registras el módulo de contrato
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
