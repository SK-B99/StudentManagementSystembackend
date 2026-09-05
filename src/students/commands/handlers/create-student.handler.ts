import {
  ConflictException,
  Injectable,
} from '@nestjs/common';
import {
  CommandHandler,
  ICommandHandler,
} from '@nestjs/cqrs';

import { PrismaService } from '../../../prisma/prisma.service';
import { CreateStudentCommand } from '../create-student.command';

@CommandHandler(CreateStudentCommand)
@Injectable()
export class CreateStudentHandler
  implements ICommandHandler<CreateStudentCommand>
{
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async execute(command: CreateStudentCommand) {
    const { data } = command;

    const existingStudent = await this.prisma.student.findFirst({
      where: {
        OR: [
          { studentId: data.studentId },
          { email: data.email },
        ],
      },
    });

    if (existingStudent) {
      throw new ConflictException(
        'Student ID or email already exists',
      );
    }

    return this.prisma.student.create({
      data: {
        studentId: data.studentId,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        dateOfBirth: data.dateOfBirth
          ? new Date(data.dateOfBirth)
          : undefined,
        gender: data.gender,
        department: data.department,
        program: data.program,
        enrollmentDate: data.enrollmentDate
          ? new Date(data.enrollmentDate)
          : undefined,
      },
    });
  }
}
