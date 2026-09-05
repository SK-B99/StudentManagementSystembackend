import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CommandHandler,
  ICommandHandler,
} from '@nestjs/cqrs';

import { PrismaService } from '../../../prisma/prisma.service';
import { DeleteStudentCommand } from '../delete-student.command';

@CommandHandler(DeleteStudentCommand)
@Injectable()
export class DeleteStudentHandler
  implements ICommandHandler<DeleteStudentCommand>
{
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async execute(command: DeleteStudentCommand) {
    const { id } = command;

    const student = await this.prisma.student.findUnique({
      where: { id },
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    await this.prisma.student.delete({
      where: { id },
    });

    return {
      message: 'Student deleted successfully',
    };
  }
}
