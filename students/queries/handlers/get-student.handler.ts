import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  IQueryHandler,
  QueryHandler,
} from '@nestjs/cqrs';

import { PrismaService } from '../../../prisma/prisma.service';
import { GetStudentQuery } from '../get-student.query';

@QueryHandler(GetStudentQuery)
@Injectable()
export class GetStudentHandler
  implements IQueryHandler<GetStudentQuery>
{
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async execute(query: GetStudentQuery) {
    const student = await this.prisma.student.findUnique({
      where: {
        id: query.id,
      },
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    return student;
  }
}
