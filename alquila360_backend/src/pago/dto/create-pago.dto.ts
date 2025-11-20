import { IsDateString, IsInt, IsNumber, IsString, MinLength } from 'class-validator';

export class CreatePagoDto {
  @IsDateString()
  fecha_pago: string;

  @IsString()
  @MinLength(3)
  metodo_pago: string;

  @IsNumber()
  monto: number;

  @IsInt()
  id_cuota: number;
}
