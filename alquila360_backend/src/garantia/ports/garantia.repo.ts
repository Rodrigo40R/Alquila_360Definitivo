import { Garantia } from '../../entity/garantia.entity';

export abstract class GarantiaRepositoryPort {
  abstract create(garantia: Garantia): Promise<Garantia>;
  abstract findAll(): Promise<Garantia[]>;
  abstract findOne(id: number): Promise<Garantia | null>;
  abstract update(id: number, data: Partial<Garantia>): Promise<Garantia>;
  abstract remove(id: number): Promise<void>;
}
