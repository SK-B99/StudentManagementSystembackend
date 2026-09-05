import { FindStudentsDto } from '../dto/find-students.dto';

export class GetStudentsQuery {
  constructor(
    public readonly filters: FindStudentsDto,
  ) {}
}
