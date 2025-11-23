import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../entity/user.entity';
import { UserRepositoryPort } from './ports/user.repo';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepositoryPort) {}

  async create(dto: CreateUserDto): Promise<User> {
    const user = new User();
    user.nombre = dto.nombre;
    user.correo = dto.correo;
    user.password = dto.password;
    user.tipo_usuario = dto.tipo_usuario;
    user.estado_cuenta = dto.estado_cuenta ?? 'ACTIVA';

    return this.userRepo.create(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepo.findAll();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepo.findOne(id);
    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    return user;
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    await this.findOne(id); // valida que existe

    const partial: Partial<User> = {};
    if (dto.nombre !== undefined) partial.nombre = dto.nombre;
    if (dto.correo !== undefined) partial.correo = dto.correo;
    if (dto.password !== undefined) partial.password = dto.password;
    if (dto.tipo_usuario !== undefined) partial.tipo_usuario = dto.tipo_usuario;
    if (dto.estado_cuenta !== undefined) partial.estado_cuenta = dto.estado_cuenta;

    return this.userRepo.update(id, partial);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    return this.userRepo.remove(id);
  }
}
