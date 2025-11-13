import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
  IsIn,
} from 'class-validator';
import type { TipoUsuario } from '../../entity/user.entity';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  nombre: string;

  @IsEmail()
  correo: string;

  @IsString()
  @IsIn(['PROPIETARIO', 'INQUILINO', 'TECNICO', 'ADMINISTRADOR'])
  tipo_usuario: TipoUsuario;

  @IsBoolean()
  @IsOptional()
  verificado?: boolean;

  @IsString()
  @IsOptional()
  estado_cuenta?: string;
}
