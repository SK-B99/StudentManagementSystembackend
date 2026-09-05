import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export enum Gender {
  Male = 'Male',
  Female = 'Female',
}

export class CreateStudentDto {
  @ApiProperty({
    description:
      'Unique identifier assigned to the student.',
    example: 'STU0049',
  })
  @IsString()
  @Matches(/^STU\d{4}$/, {
    message:
      'Student ID must be in the format STU0000',
  })
  studentId: string;

  @ApiProperty({
    description: 'Student first name.',
    example: 'John',
  })
  @IsString()
  @MinLength(2, {
    message:
      'First name must be at least 2 characters',
  })
  @MaxLength(50, {
    message:
      'First name must not exceed 50 characters',
  })
  @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/, {
    message:
      'First name can only contain letters',
  })
  firstName: string;

  @ApiProperty({
    description: 'Student last name.',
    example: 'Doe',
  })
  @IsString()
  @MinLength(2, {
    message:
      'Last name must be at least 2 characters',
  })
  @MaxLength(50, {
    message:
      'Last name must not exceed 50 characters',
  })
  @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/, {
    message:
      'Last name can only contain letters',
  })
  lastName: string;

  @ApiProperty({
    description: 'Student email address.',
    example: 'john.doe@example.com',
  })
  @IsEmail({}, {
    message: 'Please provide a valid email address',
  })
  email: string;

  @ApiPropertyOptional({
    description:
      'Student phone number.',
    example: '+233241234567',
  })
  @IsOptional()
  @IsString()
  @Matches(/^\+?[0-9\s()-]+$/, {
    message:
      'Phone number can only contain numbers',
  })
  phone?: string;

  @ApiPropertyOptional({
    description:
      'Student date of birth in ISO 8601 format.',
    example: '2002-05-15',
  })
  @IsOptional()
  @IsDateString({}, {
    message:
      'Date of birth must be a valid date',
  })
  dateOfBirth?: string;

  @ApiPropertyOptional({
    description: 'Student gender.',
    example: 'Male',
  })
  @IsOptional()
  @IsEnum(Gender, {
    message:
      'Gender must be either Male or Female',
  })
  gender?: Gender;

  @ApiPropertyOptional({
    description:
      'Academic department of the student.',
    example: 'Computer Science',
  })
  @IsOptional()
  @IsString()
  @MinLength(2, {
    message:
      'Department must be at least 2 characters',
  })
  @MaxLength(100, {
    message:
      'Department must not exceed 100 characters',
  })
  department?: string;

  @ApiPropertyOptional({
    description:
      'Academic program of the student.',
    example: 'BSc Computer Science',
  })
  @IsOptional()
  @IsString()
  @MinLength(2, {
    message:
      'Program must be at least 2 characters',
  })
  @MaxLength(150, {
    message:
      'Program must not exceed 150 characters',
  })
  program?: string;

  @ApiPropertyOptional({
    description:
      'Student enrollment date in ISO 8601 format.',
    example: '2026-09-01',
  })
  @IsOptional()
  @IsDateString({}, {
    message:
      'Enrollment date must be a valid date',
  })
  enrollmentDate?: string;
}
