// src/user/ports/user.repo.ts
import { User } from '../../entity/user.entity';

export abstract class UserRepositoryPort {
  abstract create(data: Partial<User>): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract findOne(id: number): Promise<User | null>;
  abstract update(id: number, data: Partial<User>): Promise<User>;
  abstract remove(id: number): Promise<void>;
  abstract findByCorreo(correo: string): Promise<User | null>;
}
