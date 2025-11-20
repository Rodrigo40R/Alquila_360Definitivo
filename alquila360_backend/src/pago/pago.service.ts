import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PagoRepositoryPort } from './ports/pago.repo';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { Pago } from '../entity/pago.entity';
import { CuotaRepositoryPort } from '../cuota/ports/cuota.repo';

@Injectable()
export class PagoService {
  constructor(
    private readonly pagoRepo: PagoRepositoryPort,
    private readonly cuotaRepo: CuotaRepositoryPort,
  ) {}

  async create(dto: CreatePagoDto): Promise<Pago> {
    const cuota = await this.cuotaRepo.findOne(dto.id_cuota);
    if (!cuota) {
      throw new NotFoundException(`Cuota ${dto.id_cuota} no encontrada`);
    }

    if (cuota.pago) {
      throw new BadRequestException(
        `La cuota ${dto.id_cuota} ya tiene un pago registrado`,
      );
    }

    const pago = new Pago();
    pago.fecha_pago = new Date(dto.fecha_pago);
    pago.metodo_pago = dto.metodo_pago;
    pago.monto = dto.monto;
    pago.cuota = cuota;

    const creado = await this.pagoRepo.create(pago);

    // actualizar estado de la cuota
    cuota.estado = 'PAGADA';
    cuota.pago = creado;
    await this.cuotaRepo.update(cuota.id_cuota, cuota);

    return creado;
  }

  async findAll(): Promise<Pago[]> {
    return this.pagoRepo.findAll();
  }

  async findOne(id: number): Promise<Pago> {
    const pago = await this.pagoRepo.findOne(id);
    if (!pago) {
      throw new NotFoundException(`Pago ${id} no encontrado`);
    }
    return pago;
  }

  async update(id: number, dto: UpdatePagoDto): Promise<Pago> {
    const partial: Partial<Pago> = {};
    if (dto.fecha_pago !== undefined) {
      partial.fecha_pago = new Date(dto.fecha_pago);
    }
    if (dto.metodo_pago !== undefined) partial.metodo_pago = dto.metodo_pago;
    if (dto.monto !== undefined) partial.monto = dto.monto;

    return this.pagoRepo.update(id, partial);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    return this.pagoRepo.remove(id);
  }

  async findByCuota(idCuota: number): Promise<Pago> {
    const pago = await this.pagoRepo.findByCuota(idCuota);
    if (!pago) {
      throw new NotFoundException(
        `No se encontró pago para la cuota ${idCuota}`,
      );
    }
    return pago;
  }
}
