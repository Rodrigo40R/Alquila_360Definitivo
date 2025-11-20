import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import AppDataSource from './data-source';

async function bootstrap() {
  // Inicializar la base de datos
  try {
    await AppDataSource.initialize();
    console.log('📦 Base de datos inicializada correctamente');
  } catch (error) {
    console.error('❌ Error al inicializar la base de datos:', error);
  }

  // Crear NestJS
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors({
    origin: ['http://localhost:4200', 'http://localhost:3000'],
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    credentials: false,
  });

  // Levantar servidor
  const PORT = process.env.PORT ?? 3001;
  await app.listen(PORT);

  console.log(`🚀 Servidor iniciado en http://localhost:${PORT}`);
}

bootstrap();
