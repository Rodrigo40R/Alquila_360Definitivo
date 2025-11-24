import { IsInt, IsString, MinLength } from 'class-validator';

export class CreatePropiedadDto {
  @IsString()
  @MinLength(3)
  direccion: string;

  @IsString()
  @MinLength(3)
  tipo: string;

  @IsString()
  @MinLength(3)
  estado: string;

  @IsInt()
  id_propietario: number;
}
