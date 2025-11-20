import { IsDateString, IsInt, IsString, MinLength } from 'class-validator';

export class CreateReporteDto {
  @IsString()
  @MinLength(3)
  tipo: string;

  @IsDateString()
  fecha: string;

  @IsInt()
  id_administrador: number;
}
