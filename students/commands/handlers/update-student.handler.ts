import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CommandHandler,
  ICommandHandler,
} from '@nestjs/cqrs';

import { PrismaService } from '../../../prisma/prisma.service';
import { UpdateStudentCommand } from '../update-student.command';

@CommandHandler(UpdateStudentCommand)
@Injectable()
export class UpdateStudentHandler
  implements ICommandHandler<UpdateStudentCommand>
{
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async execute(command: UpdateStudentCommand) {
    const { id, data } = command;

    const student = await this.prisma.student.findUnique({
      where: { id },
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    if (data.email || data.studentId) {
      const duplicate = await this.prisma.student.findFirst({
        where: {
          AND: [
            { id: { not: id } },
            {
              OR: [
                data.email
                  ? { email: data.email }
                  : undefined,
                data.studentId
                  ? { studentId: data.studentId }
                  : undefined,
              ].filter(Boolean) as any,
            },
          ],
        },
      });

      if (duplicate) {
        throw new ConflictException(
          'Student ID or email already exists',
        );
      }
    }

    return this.prisma.student.update({
      where: { id },
      data: {
        ...data,
        dateOfBirth: data.dateOfBirth
          ? new Date(data.dateOfBirth)
          : undefined,
        enrollmentDate: data.enrollmentDate
          ? new Date(data.enrollmentDate)
          : undefined,
      },
    });
  }
}
