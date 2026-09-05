import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { StudentsController } from './students.controller';

import { CreateStudentHandler } from './commands/handlers/create-student.handler';
import { UpdateStudentHandler } from './commands/handlers/update-student.handler';
import { DeleteStudentHandler } from './commands/handlers/delete-student.handler';

import { GetStudentHandler } from './queries/handlers/get-student.handler';
import { GetStudentsHandler } from './queries/handlers/get-students.handler';

const CommandHandlers = [
  CreateStudentHandler,
  UpdateStudentHandler,
  DeleteStudentHandler,
];

const QueryHandlers = [
  GetStudentHandler,
  GetStudentsHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [StudentsController],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class StudentsModule {}
