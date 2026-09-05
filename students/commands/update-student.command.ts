import { UpdateStudentDto } from '../dto/update-student.dto';

export class UpdateStudentCommand {
  constructor(
    public readonly id: number,
    public readonly data: UpdateStudentDto,
  ) {}
}
