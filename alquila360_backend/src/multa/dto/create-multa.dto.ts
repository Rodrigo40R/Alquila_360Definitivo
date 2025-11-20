import { IsDateString, IsEnum, IsInt, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
import type { TipoMulta, EstadoMulta } from '../../entity/multa.entity';

export class CreateMultaDto {
  @IsEnum(['Retraso', 'Daño', 'Incumplimiento'])
  tipo: TipoMulta;

  @IsNumber()
  monto: number;

  @IsDateString()
  fecha: string;

  @IsString()
  @MinLength(3)
  descripcion: string;

  @IsEnum(['Pendiente', 'Pagada', 'Anulada'])
  estado: EstadoMulta;

  @IsInt()
  id_contrato: number;

  // opcional: si la multa es por mora puede estar ligada a una cuota
  @IsInt()
  @IsOptional()
  id_cuota?: number;
}
