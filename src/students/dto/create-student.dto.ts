import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateStudentDto {
  @ApiProperty({
    description: 'Unique identifier assigned to the student.',
    example: 'STU-2026-001',
  })
  @IsString()
  studentId: string;

  @ApiProperty({
    description: 'Student first name.',
    example: 'John',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'Student last name.',
    example: 'Doe',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'Student email address.',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    description: 'Student phone number.',
    example: '+233201234567',
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({
    description: 'Student date of birth in ISO 8601 format.',
    example: '2002-05-15',
  })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @ApiPropertyOptional({
    description: 'Student gender.',
    example: 'Male',
  })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiPropertyOptional({
    description: 'Academic department of the student.',
    example: 'Computer Science',
  })
  @IsOptional()
  @IsString()
  department?: string;

  @ApiPropertyOptional({
    description: 'Academic program of the student.',
    example: 'BSc Computer Science',
  })
  @IsOptional()
  @IsString()
  program?: string;

  @ApiPropertyOptional({
    description: 'Student enrollment date in ISO 8601 format.',
    example: '2026-09-01',
  })
  @IsOptional()
  @IsDateString()
  enrollmentDate?: string;
}
