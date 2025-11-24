import { IsDateString, IsInt, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateCuotaDto {
  @IsNumber()
  monto: number;

  @IsDateString()
  fecha_vencimiento: string;

  @IsString()
  @MinLength(3)
  estado: string;

  @IsInt()
  id_contrato: number;
}
