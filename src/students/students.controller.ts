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
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
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

@ApiTags('Students')
@Controller('students')
export class StudentsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a student',
    description: 'Creates a new student.',
  })
  @ApiResponse({
    status: 201,
    description: 'Student created successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request data.',
  })
  async create(
    @Body() dto: CreateStudentDto,
  ) {
    return this.commandBus.execute(
      new CreateStudentCommand(dto),
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Get all students',
    description: 'Returns a list of students based on the supplied filters.',
  })
  @ApiResponse({
    status: 200,
    description: 'Students retrieved successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid query parameters.',
  })
  async findAll(
    @Query() query: FindStudentsDto,
  ) {
    return this.queryBus.execute(
      new GetStudentsQuery(query),
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a student',
    description: 'Returns a single student by ID.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'The unique ID of the student.',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Student retrieved successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid student ID.',
  })
  @ApiResponse({
    status: 404,
    description: 'Student not found.',
  })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.queryBus.execute(
      new GetStudentQuery(id),
    );
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a student',
    description: 'Updates an existing student by ID.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'The unique ID of the student.',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Student updated successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid student ID or request data.',
  })
  @ApiResponse({
    status: 404,
    description: 'Student not found.',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStudentDto,
  ) {
    return this.commandBus.execute(
      new UpdateStudentCommand(id, dto),
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a student',
    description: 'Deletes an existing student by ID.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'The unique ID of the student.',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Student deleted successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid student ID.',
  })
  @ApiResponse({
    status: 404,
    description: 'Student not found.',
  })
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.commandBus.execute(
      new DeleteStudentCommand(id),
    );
  }
}
