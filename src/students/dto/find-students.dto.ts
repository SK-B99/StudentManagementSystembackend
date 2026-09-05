import {
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class FindStudentsDto {
  @ApiPropertyOptional({
    description:
      'Search students by student ID, first name, last name, or email.',
    example: 'John',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Filter students by department.',
    example: 'Computer Science',
  })
  @IsOptional()
  @IsString()
  department?: string;

  @ApiPropertyOptional({
    description: 'Filter students by academic program.',
    example: 'BSc Computer Science',
  })
  @IsOptional()
  @IsString()
  program?: string;

  @ApiPropertyOptional({
    description: 'Page number for pagination.',
    example: 1,
    default: 1,
    minimum: 1,
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Number of students to return per page.',
    example: 10,
    default: 10,
    minimum: 1,
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;
}
