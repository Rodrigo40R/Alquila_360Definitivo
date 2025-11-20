import { IsInt, IsString, MinLength } from 'class-validator';

export class CreateEvaluacionDto {
  @IsInt()
  puntuacion: number;

  @IsString()
  @MinLength(3)
  comentario: string;

  @IsInt()
  id_ticket: number;
}
