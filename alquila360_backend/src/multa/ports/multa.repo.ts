import { Multa } from '../../entity/multa.entity';

export abstract class MultaRepositoryPort {
  abstract create(multa: Multa): Promise<Multa>;
  abstract findAll(): Promise<Multa[]>;
  abstract findOne(id: number): Promise<Multa | null>;
  abstract update(id: number, data: Partial<Multa>): Promise<Multa>;
  abstract remove(id: number): Promise<void>;
  abstract findByContrato(idContrato: number): Promise<Multa[]>;
}
