import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { StudentsModule } from '../students/students.module';
import { CqrsModule } from '@nestjs/cqrs';
export const { ObserveModule, ObserveInstrument } =
  createObserveModule();

@Module({
  imports: [
    // Prisma database module
    CqrsModule.forRoot(),
    PrismaModule,
    StudentsModule,

    // Distributed tracing, auto-correlated logs, request/job metrics,
    // error telemetry, alarms, and more.
   ObserveModule.forRoot({
  appKey: process.env.OBSERVE_APP_KEY!,
  appSecret: process.env.OBSERVE_APP_SECRET!,
  serviceId: process.env.OBSERVE_SERVICE_ID ?? 'student_records',
}),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
