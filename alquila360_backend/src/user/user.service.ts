import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepositoryPort } from './ports/user.repo';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../entity/user.entity';
import { Propietario } from '../entity/propietario.entity';
import { Inquilino } from '../entity/inquilino.entity';
import { Tecnico } from '../entity/tecnico.entity';
import { Administrador } from '../entity/administrador.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepositoryPort) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existing = await this.userRepo.findByCorreo(createUserDto.correo);
    if (existing) {
      throw new Error('Ya existe un usuario con ese correo');
    }

    let user: User;

    switch (createUserDto.tipo_usuario) {
      case 'PROPIETARIO':
        user = new Propietario();
        break;
      case 'INQUILINO':
        user = new Inquilino();
        break;
      case 'TECNICO':
        user = new Tecnico();
        break;
      case 'ADMINISTRADOR':
        user = new Administrador();
        break;
      default:
        user = new Inquilino();
        break;
    }

    user.nombre = createUserDto.nombre;
    user.correo = createUserDto.correo;
    user.tipo_usuario = createUserDto.tipo_usuario;
    user.verificado = createUserDto.verificado ?? false;
    user.estado_cuenta = createUserDto.estado_cuenta ?? 'ACTIVA';

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

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.findOne(id);
    return this.userRepo.update(id, updateUserDto);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    return this.userRepo.remove(id);
  }
}
import { Injectable } from "@nestjs/common";
import AppDataSource from "src/data-source";
import { User } from "src/entity/user.entity";

@Injectable()
export class UserService {
    async createUser(user: User) { 
        return await AppDataSource.getRepository(User).save(user);
    }

    async getAllUsers(){
        return await AppDataSource.getRepository(User).find();
    }

    async getUserById(id: number) {
        return await AppDataSource.getRepository(User).findOneBy({ id });
    }

    async updateUser(id: number, userData: Partial<User>) {
        await AppDataSource.getRepository(User).update(id, userData);
        return this.getUserById(id);
    }

    async deleteUser(id: number) {
        return await AppDataSource.getRepository(User).delete(id);
    }
}
