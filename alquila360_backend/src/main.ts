import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import AppDataSource from './data-source';

async function bootstrap() {
  try {
    await AppDataSource.initialize();
    console.log('📦 DB inicializada');
  } catch (error) {
    console.error('❌ Error al inicializar DB:', error);
  }

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    credentials: false,
  });

  // 🔥 Aquí activas class-validator en TODO el proyecto
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,      // borra campos extra que no estén en el DTO
      transform: true,      // convierte tipos (string → number, etc.)
      forbidNonWhitelisted: false, // si quieres que explote cuando manden basura, pon true
    }),
  );

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
