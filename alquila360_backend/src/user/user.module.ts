import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { InMemoryUserRepository } from './adapters/user.repo.memory';
import { UserRepositoryPort } from './ports/user.repo';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: UserRepositoryPort,
      useClass: InMemoryUserRepository,
    },
  ],
  exports: [UserService, UserRepositoryPort],
})
export class UserModule {}
