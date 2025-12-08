// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppDataSource } from './data-source';

// ENTIDADES
import { User } from './entity/user.entity';
import { Propietario } from './entity/propietario.entity';
import { Inquilino } from './entity/inquilino.entity';
import { Tecnico } from './entity/tecnico.entity';
import { Administrador } from './entity/administrador.entity';
import { Propiedad } from './entity/propiedad.entity';
import { Ticket } from './entity/ticket.entity';
import { Garantia } from './entity/garantia.entity';
import { Contrato } from './entity/contrato.entity';
import { Reporte } from './entity/reporte.entity';
import { Evaluacion } from './entity/evaluacion.entity';
import { Multa } from './entity/multa.entity';
import { Cuota } from './entity/cuota.entity';
import { Pago } from './entity/pago.entity';

// MÓDULOS
import { UserModule } from './user/user.module';
import { PropiedadModule } from './propiedad/propiedad.module';
import { TicketModule } from './ticket/ticket.module';
import { ContratoModule } from './contrato/contrato.module';
import { GarantiaModule } from './garantia/garantia.module';
import { ReporteModule } from './reporte/reporte.module';
import { EvaluacionModule } from './evaluacion/evaluacion.module';
import { MultaModule } from './multa/multa.module';
import { PagoModule } from './pago/pago.module';
import { CuotaModule } from './cuota/cuota.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    TypeOrmModule.forFeature([
      User,
      Propietario,
      Inquilino,
      Tecnico,
      Administrador,
      Propiedad,
      Ticket,
      Garantia,
      Contrato,
      Reporte,
      Evaluacion,
      Multa,
      Cuota,
      Pago,
    ]),

    UserModule,
    PropiedadModule,
    TicketModule,
    ContratoModule,
    GarantiaModule,
    ReporteModule,
    EvaluacionModule,
    MultaModule,
    PagoModule,
    CuotaModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
