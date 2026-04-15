import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Configuración de Pipes globales (para que los DTOs funcionen)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // 2. Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Office Pets API')
    .setDescription('API para la gestión de mascotas en la oficina')
    .setVersion('1.0')
    .addBearerAuth() // útil para cuando hagamos el Login
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Aquí definimos la ruta: 'api/docs'
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
  console.log('🚀 Application is running on: http://localhost:3000/api/docs');
}

void bootstrap();
