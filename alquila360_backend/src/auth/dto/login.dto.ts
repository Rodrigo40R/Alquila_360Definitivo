import {
  IsEmail,
  IsIn,
  IsString,
  MinLength,
} from 'class-validator';
import type { TipoUsuario } from '../../entity/user.entity';

export class LoginDto {
  @IsEmail()
  correo: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsIn(['PROPIETARIO', 'INQUILINO', 'TECNICO', 'ADMINISTRADOR'])
  tipo_usuario: TipoUsuario;
}
