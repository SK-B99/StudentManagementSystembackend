import { NestFactory } from '@nestjs/core';
import {
  AppModule,
  ObserveInstrument,
} from './app.module';
import {
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  // Global API prefix
  app.setGlobalPrefix('api');

  // CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL ?? 'http://localhost:3000',
    credentials: true,
  });

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Student Management System API')
    .setDescription(
      'REST API for managing student records and information.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 4000);
}

bootstrap();
