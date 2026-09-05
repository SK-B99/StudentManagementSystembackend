import { Injectable } from '@nestjs/common';
import {
  IQueryHandler,
  QueryHandler,
} from '@nestjs/cqrs';

import { PrismaService } from '../../../prisma/prisma.service';
import { GetStudentsQuery } from '../get-students.query';

@QueryHandler(GetStudentsQuery)
@Injectable()
export class GetStudentsHandler
  implements IQueryHandler<GetStudentsQuery>
{
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async execute(query: GetStudentsQuery) {
    const {
      search,
      department,
      program,
      page = 1,
      limit = 5,
    } = query.filters;

    
    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const skip = (pageNumber - 1) * limitNumber;

    const where = {
      ...(department && {
        department,
      }),

      ...(program && {
        program,
      }),

      ...(search && {
        OR: [
          {
            firstName: {
              contains: search,
              mode: 'insensitive' as const,
            },
          },
          {
            lastName: {
              contains: search,
              mode: 'insensitive' as const,
            },
          },
          {
            email: {
              contains: search,
              mode: 'insensitive' as const,
            },
          },
          {
            studentId: {
              contains: search,
              mode: 'insensitive' as const,
            },
          },
        ],
      }),
    };

    const [students, total] = await Promise.all([
      this.prisma.student.findMany({
        where,
        skip,
        take: limitNumber,
        orderBy: {
          createdAt: 'desc',
        },
      }),

      this.prisma.student.count({
        where,
      }),
    ]);

    return {
      data: students,
      meta: {
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(total / limitNumber),
      },
    };
  }
}
