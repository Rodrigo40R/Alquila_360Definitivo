// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserService } from './user.service';

import { User } from '../entity/user.entity';
import { USER_REPOSITORY } from './ports/user.repo';
import { UserTypeOrmRepository } from './adapters/user.repo.typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: USER_REPOSITORY,
      useClass: UserTypeOrmRepository,
    },
  ],
  exports: [
    UserService,
    USER_REPOSITORY, // 👈 esto permite que otros módulos inyecten el repo de usuario
  ],
})
export class UserModule {}
