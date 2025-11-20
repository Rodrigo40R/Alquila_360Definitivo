import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
import { Pago } from './entity/pago.entity';

@Module({
  imports: [
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
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
