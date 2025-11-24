// src/user/user.service.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// 👇 USER_REPOSITORY es un valor (token de Nest), import normal
import { USER_REPOSITORY } from './ports/user.repo';

// 👇 UserRepositoryPort es SOLO un tipo, lo importamos con 'import type'
import type { UserRepositoryPort } from './ports/user.repo';

import { User } from '../entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepositoryPort,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
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

  async findByCorreo(correo: string): Promise<User | null> {
    return this.userRepo.findByCorreo(correo);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const existing = await this.userRepo.findOne(id);
    if (!existing) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    return this.userRepo.update(id, updateUserDto);
  }

  async remove(id: number): Promise<void> {
    const existing = await this.userRepo.findOne(id);
    if (!existing) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    return this.userRepo.remove(id);
  }
}
