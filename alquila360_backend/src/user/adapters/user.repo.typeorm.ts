// src/user/adapters/user.repo.typeorm.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../entity/user.entity';
import { UserRepositoryPort } from '../ports/user.repo';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserTypeOrmRepository implements UserRepositoryPort {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async create(data: CreateUserDto): Promise<User> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async findAll(): Promise<User[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<User | null> {
    // cambia id_usuario por tu PK real
    return this.repo.findOne({ where: { id_usuario: id } });
  }

  async update(id: number, data: UpdateUserDto): Promise<User> {
    await this.repo.update(id, data);

    const updated = await this.repo.findOne({
      where: { id_usuario: id }, // ajusta el nombre de columna
    });

    // aquí sabemos que no debería ser null porque el servicio
    // ya valida la existencia antes de llamar a update
    return updated as User;
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  // 👇 ESTE MÉTODO ES EL QUE FALTABA
  async findByCorreo(correo: string): Promise<User | null> {
    return this.repo.findOne({ where: { correo } });
  }
}
