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
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const port = process.env.PORT ?? 4000;
  const host = 'http://localhost';

  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  app.use(helmet());

  app.setGlobalPrefix('api');

  app.enableCors({
    origin:
      process.env.FRONTEND_URL ?? 'http://localhost:3000',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Student Management System API')
    .setDescription(
      'REST API for managing student records and information.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(
    app,
    config,
  );

  SwaggerModule.setup('api/docs', app, document);

  await app.listen(port);

  console.log('');
  console.log('==========================================');
  console.log('Student Management System API');
  console.log('==========================================');
  console.log(` App:     ${host}:${port}/api`);
  console.log(
    ` SwaggerApi: ${host}:${port}/api/docs`,
  );
  console.log('==========================================');
  console.log('');
}

bootstrap();
