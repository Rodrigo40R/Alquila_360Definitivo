// src/ticket/ticket.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';

import { Ticket } from '../entity/ticket.entity';
import { TICKET_REPOSITORY } from './ports/ticket.repo';
import { TicketTypeOrmRepository } from './adapters/ticket.repo.typeorm';

import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket]),
    UserModule,
  ],
  controllers: [TicketController],
  providers: [
    TicketService,
    {
      provide: TICKET_REPOSITORY,
      useClass: TicketTypeOrmRepository, // 👈 ya no usamos InMemoryTicketRepository
    },
  ],
  exports: [TicketService],
})
export class TicketModule {}
