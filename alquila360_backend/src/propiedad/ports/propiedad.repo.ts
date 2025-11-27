// src/propiedad/ports/propiedad.repo.ts
import { Propiedad } from '../../entity/propiedad.entity';
import { CreatePropiedadDto } from '../dto/create-propiedad.dto';
import { UpdatePropiedadDto } from '../dto/update-propiedad.dto';

// Token para inyección de dependencias
export const PROPIEDAD_REPOSITORY = 'PROPIEDAD_REPOSITORY';

// Puerto del repositorio de Propiedad
export interface PropiedadRepositoryPort {
  create(data: Propiedad | CreatePropiedadDto): Promise<Propiedad>;
  findAll(): Promise<Propiedad[]>;
  findOne(id: number): Promise<Propiedad | null>;
  update(id: number, data: UpdatePropiedadDto): Promise<Propiedad>;
  remove(id: number): Promise<void>;
  findByPropietario(idPropietario: number): Promise<Propiedad[]>;
}
