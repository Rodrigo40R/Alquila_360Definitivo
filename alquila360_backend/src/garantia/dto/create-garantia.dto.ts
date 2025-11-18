import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateGarantiaDto {
    @IsNotEmpty({ message: 'El monto de la garantía es obligatorio.' })
    @IsNumber()
    readonly monto: number; 

    @IsNotEmpty({ message: 'La descripción es obligatoria.' })
    @IsString()
    readonly descripcion: string;

    @IsNotEmpty({ message: 'Se necesita el ID del contrato.' })
    @IsNumber()
    readonly contratoId: number; 
}