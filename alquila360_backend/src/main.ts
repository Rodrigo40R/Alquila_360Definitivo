import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:4200', 'http://localhost:3000'],
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    credentials: false,
  });

  await app.listen(3001);
}
bootstrap();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import AppDataSource from './data-source';

async function bootstrap() {
  try {
    AppDataSource.initialize()
  } catch (error) {
    console.log(error)
  }

  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
