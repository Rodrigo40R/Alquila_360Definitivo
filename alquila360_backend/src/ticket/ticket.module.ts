import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { InMemoryTicketRepository } from './adapters/ticket.repo.memory';
import { TicketRepositoryPort } from './ports/ticket.repo';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [TicketController],
  providers: [
    TicketService,
    {
      provide: TicketRepositoryPort,
      useClass: InMemoryTicketRepository,
    },
  ],
  exports: [TicketService, TicketRepositoryPort],
})
export class TicketModule {}
