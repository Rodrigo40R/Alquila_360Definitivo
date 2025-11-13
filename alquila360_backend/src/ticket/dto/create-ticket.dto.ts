import { IsInt, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  @MinLength(3)
  descripcion: string;

  @IsString()
  @MinLength(3)
  prioridad: string;

  @IsString()
  @MinLength(3)
  estado: string;

  @IsString()
  @MinLength(3)
  subestado: string;

  // FK del inquilino que crea el ticket
  @IsInt()
  id_inquilino: number;

  // FK del técnico que atiende (puede venir vacío al inicio)
  @IsInt()
  @IsOptional()
  id_tecnico?: number;
}
