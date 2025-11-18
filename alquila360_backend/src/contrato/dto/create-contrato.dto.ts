// src/contrato/dto/create-contrato.dto.ts
import { IsDateString, IsNotEmpty, IsNumber, IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateContratoDto {
    @IsNotEmpty()
    @IsDateString()
    readonly fecha_inicio: string;

    @IsNotEmpty()
    @IsDateString()
    readonly fecha_fin: string;

    @IsNotEmpty()
    @IsNumber()
    readonly monto_mensual: number; 

    @IsOptional() // Puede tener un valor por defecto en la entidad
    @IsBoolean()
    readonly renovable?: boolean;

    @IsOptional()
    @IsString()
    readonly estado?: string;

    // IDs de las claves foráneas (FKs)
    @IsNotEmpty()
    @IsNumber()
    readonly id_propiedad: number;

    @IsNotEmpty()
    @IsNumber()
    readonly id_propietario: number;

    @IsNotEmpty()
    @IsNumber()
    readonly id_inquilino: number;
}