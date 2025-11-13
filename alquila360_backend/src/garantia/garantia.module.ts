import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GarantiaController } from './garantia.controller';
import { GarantiaService } from './garantia.service';
import { Garantia } from '../entity/garantia/garantia.entity';
// import { Contrato } from '../entity/contrato/contrato.entity'; (se activa al hacer la entidad contrato)

@Module({
    imports: [
        TypeOrmModule.forFeature([Garantia, Contrato]), // Registramos ambas entidades que usa el servicio
    ],
    controllers: [GarantiaController],
    providers: [GarantiaService],
    exports: [GarantiaService],
})
export class GarantiaModule {}