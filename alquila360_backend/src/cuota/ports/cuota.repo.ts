import { Cuota } from '../../entity/cuota.entity';

export abstract class CuotaRepositoryPort {
  abstract create(cuota: Cuota): Promise<Cuota>;
  abstract findAll(): Promise<Cuota[]>;
  abstract findOne(id: number): Promise<Cuota | null>;
  abstract update(id: number, data: Partial<Cuota>): Promise<Cuota>;
  abstract remove(id: number): Promise<void>;
  abstract findByContrato(idContrato: number): Promise<Cuota[]>;
}
