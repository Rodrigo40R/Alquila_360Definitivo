// src/user/ports/user.repo.ts
import { User } from '../../entity/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

// Token de inyección
export const USER_REPOSITORY = 'USER_REPOSITORY';

// Contrato que implementan los repositorios de User
export interface UserRepositoryPort {
  create(data: CreateUserDto): Promise<User>;
  findAll(): Promise<User[]>;
  findOne(id: number): Promise<User | null>;
  update(id: number, data: UpdateUserDto): Promise<User>;
  remove(id: number): Promise<void>;
  findByCorreo(correo: string): Promise<User | null>;
}
