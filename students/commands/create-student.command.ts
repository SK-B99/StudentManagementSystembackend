import { CreateStudentDto } from '../dto/create-student.dto';

export class CreateStudentCommand {
  constructor(
    public readonly data: CreateStudentDto,
  ) {}
}
