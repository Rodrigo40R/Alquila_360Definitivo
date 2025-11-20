import { Injectable } from '@nestjs/common';
import { UserRepositoryPort } from '../ports/user.repo';
import { User } from '../../entity/user.entity';

@Injectable()
export class InMemoryUserRepository implements UserRepositoryPort {
  private users: User[] = [];
  private currentId = 1;

  async create(data: Partial<User>): Promise<User> {

    const user = data as User;

    user.id_usuario = this.currentId++;

    if (!user.verificado && user.verificado !== false) {
      user.verificado = false;
    }

    if (!user.estado_cuenta) {
      user.estado_cuenta = 'ACTIVA';
    }

    if (!user.tipo_usuario) {
      user.tipo_usuario = 'INQUILINO';
    }

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
