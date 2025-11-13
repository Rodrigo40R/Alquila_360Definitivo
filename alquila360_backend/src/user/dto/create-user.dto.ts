// src/user/dto/create-user.dto.ts
import { IsBoolean, IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  nombre: string;

  @IsEmail()
  correo: string;

  @IsString()
  @IsOptional()
  tipo_usuario?: string;

  @IsBoolean()
  @IsOptional()
  verificado?: boolean;

  @IsString()
  @IsOptional()
  estado_cuenta?: string;
}
