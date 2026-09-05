import { NestFactory } from '@nestjs/core';
import {
  AppModule,
  ObserveInstrument,
} from './app.module';
import {
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  const port = process.env.PORT ?? 4000;
  const host = 'http://localhost';

  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  // Security headers
  app.use(helmet());

  // Global API prefix
  app.setGlobalPrefix('api');

  // CORS
  app.enableCors({
    origin:
      process.env.FRONTEND_URL ?? 'http://localhost:3000',
    credentials: true,
  });

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Student Management System API')
    .setDescription(
      'REST API for managing student records and information.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  // Generate Swagger document
  const document = SwaggerModule.createDocument(
    app,
    config,
  );

  // Swagger UI
  SwaggerModule.setup('api/docs', app, document);

  // Start application
  await app.listen(port);

  // Console logs
  console.log('');
  console.log('==========================================');
  console.log('Student Management System API');
  console.log('==========================================');
  console.log(` App:     ${host}:${port}/api`);
  console.log(` SwaggerApi: ${host}:${port}/api/docs`);
  console.log('==========================================');
  console.log('');
}

bootstrap();
