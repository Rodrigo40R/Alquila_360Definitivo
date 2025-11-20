import { Contrato } from '../../entity/contrato.entity';

export abstract class ContratoRepositoryPort {
  abstract create(contrato: Contrato): Promise<Contrato>;
  abstract findAll(): Promise<Contrato[]>;
  abstract findOne(id: number): Promise<Contrato | null>;
  abstract update(id: number, data: Partial<Contrato>): Promise<Contrato>;
  abstract remove(id: number): Promise<void>;
  abstract findByPropietario(idPropietario: number): Promise<Contrato[]>;
  abstract findByInquilino(idInquilino: number): Promise<Contrato[]>;
}
