// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { InMemoryUserRepository } from './adapters/user.repo.memory';
import { UserRepositoryPort } from './ports/user.repo';
// Si ya usas TypeORM, importa también la entidad:
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './entities/user.entity';

@Module({
  // imports: [TypeOrmModule.forFeature([User])], // <- cuando uses TypeORM
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: UserRepositoryPort,
      useClass: InMemoryUserRepository, // después aquí cambias al repo de TypeORM
    },
  ],
  exports: [UserService, UserRepositoryPort],
})
export class UserModule {}
