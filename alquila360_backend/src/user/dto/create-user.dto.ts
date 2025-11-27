import {
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import type { TipoUsuario } from '../../entity/user.entity';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  nombre: string;

  @IsEmail()
  correo: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsIn(['PROPIETARIO', 'INQUILINO', 'TECNICO', 'ADMINISTRADOR'])
  tipo_usuario: TipoUsuario;

  @IsOptional()
  @IsString()
  estado_cuenta?: string;
}
