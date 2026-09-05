import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  CommandBus,
  QueryBus,
} from '@nestjs/cqrs';

import { CreateStudentDto } from './dto/create-student.dto';
import { FindStudentsDto } from './dto/find-students.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

import { CreateStudentCommand } from './commands/create-student.command';
import { UpdateStudentCommand } from './commands/update-student.command';
import { DeleteStudentCommand } from './commands/delete-student.command';

import { GetStudentQuery } from './queries/get-student.query';
import { GetStudentsQuery } from './queries/get-students.query';

@Controller('students')
export class StudentsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(
    @Body() dto: CreateStudentDto,
  ) {
    return this.commandBus.execute(
      new CreateStudentCommand(dto),
    );
  }

  @Get()
  async findAll(
    @Query() query: FindStudentsDto,
  ) {
    return this.queryBus.execute(
      new GetStudentsQuery(query),
    );
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.queryBus.execute(
      new GetStudentQuery(id),
    );
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStudentDto,
  ) {
    return this.commandBus.execute(
      new UpdateStudentCommand(id, dto),
    );
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.commandBus.execute(
      new DeleteStudentCommand(id),
    );
  }
}
