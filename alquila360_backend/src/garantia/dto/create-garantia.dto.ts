import { IsNumber, IsString, MinLength } from 'class-validator';

export class CreateGarantiaDto {
  @IsNumber()
  monto: number;

  @IsString()
  @MinLength(3)
  descripcion: string;
}
