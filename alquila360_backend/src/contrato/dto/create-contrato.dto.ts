import {
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateContratoDto {
  @IsDateString()
  fecha_inicio: string;

  @IsDateString()
  fecha_fin: string;

  @IsNumber()
  monto_mensual: number;

  @IsString()
  estado: string;

  @IsInt()
  id_propietario: number;

  @IsInt()
  id_inquilino: number;

  @IsInt()
  @IsOptional()
  id_garantia?: number;
}
