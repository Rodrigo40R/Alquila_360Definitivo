import { IsInt, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateEvaluacionDto {
  @IsInt()
  puntuacion: number;

  @IsString()
  @MinLength(3)
  @MaxLength(40, { message: 'El comentario no puede exceder los 40 caracteres.' })
  comentario: string;

  @IsInt()
  id_ticket: number;
}
