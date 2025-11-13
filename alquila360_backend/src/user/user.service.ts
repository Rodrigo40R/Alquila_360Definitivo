// src/user/user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepositoryPort } from './ports/user.repo';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../entity/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepositoryPort) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // aquí podrías validar que el correo no exista
    const existing = await this.userRepo.findByCorreo(createUserDto.correo);
    if (existing) {
      throw new Error('Ya existe un usuario con ese correo');
    }

    return this.userRepo.create(createUserDto);
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

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.findOne(id); // lanza excepción si no existe
    return this.userRepo.update(id, updateUserDto);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id); // lanza excepción si no existe
    return this.userRepo.remove(id);
  }
}
