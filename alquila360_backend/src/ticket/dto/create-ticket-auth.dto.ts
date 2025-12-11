import { IsString, MinLength } from 'class-validator';

/**
 * DTO para crear un ticket desde un inquilino autenticado (JWT)
 * No requiere id_inquilino porque se obtiene del token
 */
export class CreateTicketAuthDto {
  @IsString()
  @MinLength(3)
  descripcion: string;

  @IsString()
  @MinLength(3)
  prioridad: string;
}
