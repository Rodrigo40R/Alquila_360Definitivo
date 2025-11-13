import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { InMemoryUserRepository } from './adapters/user.repo.memory';
import { UserRepositoryPort } from './ports/user.repo';

// Si luego usas TypeORM real, aquí importarías las entidades:
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from '../entity/user.entity';
// import { Propietario } from '../entity/propietario.entity';
// import { Inquilino } from '../entity/inquilino.entity';
// import { Tecnico } from '../entity/tecnico.entity';
// import { Administrador } from '../entity/administrador.entity';

@Module({
  // imports: [
  //   TypeOrmModule.forFeature([
  //     User,
  //     Propietario,
  //     Inquilino,
  //     Tecnico,
  //     Administrador,
  //   ]),
  // ],
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
