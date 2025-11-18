import { Propiedad } from '../../entity/propiedad.entity';

export abstract class PropiedadRepositoryPort {
  abstract create(data: Propiedad): Promise<Propiedad>;
  abstract findAll(): Promise<Propiedad[]>;
  abstract findOne(id: number): Promise<Propiedad | null>;
  abstract update(id: number, data: Partial<Propiedad>): Promise<Propiedad>;
  abstract remove(id: number): Promise<void>;
  abstract findByPropietario(idPropietario: number): Promise<Propiedad[]>;
}
