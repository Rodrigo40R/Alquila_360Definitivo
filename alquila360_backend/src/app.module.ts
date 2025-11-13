import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { GarantiaModule } from './garantia/garantia.module';

@Module({
  imports: [
    // ... TypeOrmModule.forRoot(config)
    // ... otros módulos
    GarantiaModule, // <-- Añade esto
  ],
  // ...
})
export class AppModule {}