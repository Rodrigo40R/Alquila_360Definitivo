// src/user/adapters/user.repo.memory.ts
import { Injectable } from '@nestjs/common';
import { UserRepositoryPort } from '../ports/user.repo';
import { User } from '../../entity/user.entity';

@Injectable()
export class InMemoryUserRepository implements UserRepositoryPort {
  private users: User[] = [];
  private currentId = 1;

  async create(data: Partial<User>): Promise<User> {
    const user = new User();
    user.id_usuario = this.currentId++;
    user.nombre = data.nombre!;
    user.correo = data.correo!;
    user.tipo_usuario = data.tipo_usuario ?? 'cliente';
    user.verificado = data.verificado ?? false;
    user.estado_cuenta = data.estado_cuenta ?? 'ACTIVA';

    this.users.push(user);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findOne(id: number): Promise<User | null> {
    const user = this.users.find((u) => u.id_usuario === id);
    return user ?? null;
  }

  async update(id: number, data: Partial<User>): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error(`Usuario con id ${id} no encontrado`);
    }

    if (data.nombre !== undefined) user.nombre = data.nombre;
    if (data.correo !== undefined) user.correo = data.correo;
    if (data.tipo_usuario !== undefined) user.tipo_usuario = data.tipo_usuario;
    if (data.verificado !== undefined) user.verificado = data.verificado;
    if (data.estado_cuenta !== undefined) user.estado_cuenta = data.estado_cuenta;

    return user;
  }

  async remove(id: number): Promise<void> {
    this.users = this.users.filter((u) => u.id_usuario !== id);
  }

  async findByCorreo(correo: string): Promise<User | null> {
    const user = this.users.find((u) => u.correo === correo);
    return user ?? null;
  }
}
