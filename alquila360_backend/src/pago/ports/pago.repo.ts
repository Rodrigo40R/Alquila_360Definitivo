import { Pago } from '../../entity/pago.entity';

export abstract class PagoRepositoryPort {
  abstract create(pago: Pago): Promise<Pago>;
  abstract findAll(): Promise<Pago[]>;
  abstract findOne(id: number): Promise<Pago | null>;
  abstract update(id: number, data: Partial<Pago>): Promise<Pago>;
  abstract remove(id: number): Promise<void>;
  abstract findByCuota(idCuota: number): Promise<Pago | null>;
}
