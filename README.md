
# Student Management System

A full-stack student management system built with **Next.js**, **NestJS**, **CQRS**, **PostgreSQL**, and **Prisma**.

The application provides a modern interface for managing student records while demonstrating a structured backend architecture with CQRS, REST APIs, database integration, validation, Swagger documentation, and automated testing.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [CQRS Architecture](#cqrs-architecture)
- [Project Structure](#project-structure)
- [Database Design](#database-design)
- [API Endpoints](#api-endpoints)
- [API Documentation](#api-documentation)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Database Seeding](#database-seeding)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Development Workflow](#development-workflow)
- [Error Handling](#error-handling)
- [Future Improvements](#future-improvements)
- [License](#license)

---

## Overview

The Student Management System allows administrators to manage student records through a web-based interface.

The system supports the complete student record lifecycle:

```text
Create → Read → Update → Delete
````

 The application consists of two main parts:

 - **Frontend** — Next.js application
- **Backend** — NestJS REST API

 The backend uses **CQRS (Command Query Responsibility Segregation)** to separate operations that modify data from operations that retrieve data.

 PostgreSQL is used as the primary database, with Prisma providing type-safe database access.

---

 ## Features

 ### Student Management

 - Add new students
- View all students
- View individual student details
- Update student information
- Delete student records
- Search students
- Filter students
- Pagination
- Form validation
- API validation
- Error handling
- Loading states
- Empty states
- Delete confirmation

 ### Student Information

 Each student record can contain:

 - Student ID
- First name
- Last name
- Email
- Phone number
- Date of birth
- Gender
- Department
- Program
- Enrollment date
- Created date
- Updated date

---

 ## Technology Stack

 ### Frontend

 - Next.js
- React
- TypeScript
- Tailwind CSS

 ### Backend

 - NestJS
- TypeScript
- NestJS CQRS
- REST API
- Swagger / OpenAPI

 ### Database

 - PostgreSQL
- Prisma ORM

 ### Validation

 - class-validator
- class-transformer

 ### Testing

 - Jest
- Supertest

 ### Development Tools

 - Git
- npm
- Swagger UI

---

 ## Architecture

 The application follows a separated frontend and backend architecture.

```
┌───────────────────────────────────────────────┐
│                    CLIENT                     │
│                                               │
│              Next.js + React                  │
│              TypeScript                      │
│              Tailwind CSS                    │
│                                               │
└───────────────────────┬───────────────────────┘
                        │
                        │ HTTP / REST / JSON
                        ▼
┌───────────────────────────────────────────────┐
│                   BACKEND                     │
│                                               │
│             NestJS + TypeScript               │
│                                               │
│        Controllers → CQRS → Handlers          │
│                                               │
└───────────────────────┬───────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────┐
│                 DATA ACCESS                   │
│                                               │
│                    Prisma                     │
│                                               │
└───────────────────────┬───────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────┐
│                   DATABASE                    │
│                                               │
│                  PostgreSQL                   │
│                                               │
└───────────────────────────────────────────────┘
```

---

 ## CQRS Architecture

 The backend uses **CQRS (Command Query Responsibility Segregation)**.

 CQRS separates operations that modify application state from operations that retrieve information.

 ### Commands

 Commands represent operations that change application state.

```
CreateStudent
UpdateStudent
DeleteStudent
```

 Command flow:

```
HTTP Request
     │
     ▼
Controller
     │
     ▼
CommandBus
     │
     ▼
Command
     │
     ▼
CommandHandler
     │
     ▼
Prisma
     │
     ▼
PostgreSQL
```

 ### Queries

 Queries retrieve information without modifying application state.

```
GetStudents
GetStudent
```

 Query flow:

```
HTTP Request
     │
     ▼
Controller
     │
     ▼
QueryBus
     │
     ▼
Query
     │
     ▼
QueryHandler
     │
     ▼
Prisma
     │
     ▼
PostgreSQL
```

 ### CQRS Operations

```
Commands
├── CreateStudent
├── UpdateStudent
└── DeleteStudent

Queries
├── GetStudents
└── GetStudent
```

---

 ## Project Structure

```
student-management/
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── types/
│   │   └── ...
│   │
│   ├── public/
│   ├── package.json
│   └── ...
│
├── backend/
│   │
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   │
│   ├── src/
│   │   │
│   │   ├── prisma/
│   │   │   ├── prisma.module.ts
│   │   │   └── prisma.service.ts
│   │   │
│   │   ├── students/
│   │   │   │
│   │   │   ├── commands/
│   │   │   │   ├── create-student/
│   │   │   │   │   ├── create-student.command.ts
│   │   │   │   │   └── create-student.handler.ts
│   │   │   │   │
│   │   │   │   ├── update-student/
│   │   │   │   │   ├── update-student.command.ts
│   │   │   │   │   └── update-student.handler.ts
│   │   │   │   │
│   │   │   │   └── delete-student/
│   │   │   │       ├── delete-student.command.ts
│   │   │   │       └── delete-student.handler.ts
│   │   │   │
│   │   │   ├── queries/
│   │   │   │   ├── get-students/
│   │   │   │   │   ├── get-students.query.ts
│   │   │   │   │   └── get-students.handler.ts
│   │   │   │   │
│   │   │   │   └── get-student/
│   │   │   │       ├── get-student.query.ts
│   │   │   │       └── get-student.handler.ts
│   │   │   │
│   │   │   ├── dto/
│   │   │   │   ├── create-student.dto.ts
│   │   │   │   └── update-student.dto.ts
│   │   │   │
│   │   │   ├── students.controller.ts
│   │   │   └── students.module.ts
│   │   │
│   │   ├── app.module.ts
│   │   └── main.ts
│   │
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── ...
│
├── README.md
└── .gitignore
```

---

 ## Database Design

 The initial database contains a `Student` entity.

 ### Student

 | Field | Type | Description |
| --- | --- | --- |
| `id` | Integer | Primary key |
| `studentId` | String | Unique student identifier |
| `firstName` | String | Student's first name |
| `lastName` | String | Student's last name |
| `email` | String | Unique email address |
| `phone` | String | Student's phone number |
| `dateOfBirth` | DateTime | Student's date of birth |
| `gender` | String | Student's gender |
| `department` | String | Academic department |
| `program` | String | Academic program |
| `enrollmentDate` | DateTime | Date student enrolled |
| `createdAt` | DateTime | Record creation timestamp |
| `updatedAt` | DateTime | Last update timestamp |

 ### Prisma Model

```
model Student {
  id             Int      @id @default(autoincrement())
  studentId      String   @unique
  firstName      String
  lastName       String
  email          String   @unique
  phone          String?
  dateOfBirth    DateTime?
  gender         String?
  department     String?
  program        String?
  enrollmentDate DateTime?
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}
```

---

 ## API Endpoints

 The backend exposes RESTful endpoints for student management.

 | Method | Endpoint | Description | CQRS |
| --- | --- | --- | --- |
| `GET` | `/api/students` | Get all students | Query |
| `GET` | `/api/students/:id` | Get one student | Query |
| `POST` | `/api/students` | Create student | Command |
| `PATCH` | `/api/students/:id` | Update student | Command |
| `DELETE` | `/api/students/:id` | Delete student | Command |

---

 ### Create Student

```
POST /api/students
```

 Example request:

```
{
  "studentId": "STU-2026-001",
  "firstName": "John",
  "lastName": "Mensah",
  "email": "john@example.com",
  "phone": "0240000000",
  "dateOfBirth": "2005-03-15",
  "gender": "Male",
  "department": "Computer Science",
  "program": "BSc Computer Science",
  "enrollmentDate": "2026-09-01"
}
```

---

 ### Get Students

```
GET /api/students
```

 Example response:

```
{
  "data": [
    {
      "id": 1,
      "studentId": "STU-2026-001",
      "firstName": "John",
      "lastName": "Mensah",
      "email": "john@example.com",
      "department": "Computer Science",
      "program": "BSc Computer Science"
    }
  ],
  "total": 1
}
```

---

 ### Get Student

```
GET /api/students/:id
```

 Example:

```
GET /api/students/1
```

---

 ### Update Student

```
PATCH /api/students/:id
```

 Example request:

```
{
  "phone": "0241111111",
  "program": "BSc Software Engineering"
}
```

---

 ### Delete Student

```
DELETE /api/students/:id
```

 The frontend should request confirmation before deleting a student.

---

 ## API Documentation

 Swagger / OpenAPI is used to document and test the REST API.

 Once the backend is running, Swagger UI will be available at:

```
http://localhost:4000/api/docs
```

 Swagger provides an interactive interface for:

 - Viewing available endpoints
- Viewing request schemas
- Viewing response schemas
- Testing API endpoints
- Understanding validation requirements
- Exploring the API contract

---

 # Getting Started

 ## Prerequisites

 Make sure the following are installed:

 - Node.js 20+
- npm
- PostgreSQL
- Git

 Verify Node.js:

```
node --version
```

 Verify npm:

```
npm --version
```

 Verify PostgreSQL:

```
psql --version
```

---

 ## Clone the Repository

```
git clone <repository-url>

cd student-management
```

---

 # Backend Setup

 Navigate to the backend:

```
cd backend
```

 Install dependencies:

```
npm install
```

 Required packages:

```
npm install @nestjs/config
npm install @nestjs/cqrs
npm install @nestjs/swagger
npm install class-validator class-transformer
npm install helmet
npm install prisma @prisma/client
```

 Install testing dependencies:

```
npm install --save-dev supertest @types/supertest
```

---

 # Environment Variables

 Create a `.env` file inside the `backend` directory.

```
DATABASE_URL="postgresql://postgres:password@localhost:5432/student_management"

PORT=4000

FRONTEND_URL="http://localhost:3000"
```

 Do not commit your `.env` file to Git.

 Create an `.env.example` file containing:

```
DATABASE_URL=
PORT=4000
FRONTEND_URL=http://localhost:3000
```

---

 # Database Setup

 Create a PostgreSQL database named:

```
student_management
```

 For example:

```
CREATE DATABASE student_management;
```

 Make sure PostgreSQL is running before starting the application.

---

 # Prisma Setup

 Initialize Prisma if necessary:

```
npx prisma init
```

 Generate the Prisma client:

```
npx prisma generate
```

 Run the database migration:

```
npx prisma migrate dev
```

 Give the migration an appropriate name when prompted:

```
init
```

---

 # Database Seeding

 The project includes seed data for development.

 Seed data makes it possible to populate the database with realistic student records without manually entering them through the frontend.

 Example records:

```
STU-2026-001 | John Mensah
STU-2026-002 | Ama Owusu
STU-2026-003 | Kofi Boateng
STU-2026-004 | Akua Asante
STU-2026-005 | Kwame Osei
```

 Run the seed:

```
npx prisma db seed
```

---

 # Running the Application

 The frontend and backend run independently.

 ## Start the Backend

 From the `backend` directory:

```
npm run start:dev
```

 Backend:

```
http://localhost:4000
```

 Swagger:

```
http://localhost:4000/api/docs
```

---

 # Frontend Setup

 Open a new terminal and navigate to the frontend:

```
cd frontend
```

 Install dependencies:

```
npm install
```

 Create:

```
.env.local
```

 Add:

```
NEXT_PUBLIC_API_URL="http://localhost:4000/api"
```

 Start Next.js:

```
npm run dev
```

 Frontend:

```
http://localhost:3000
```

---

 # Running Both Applications

 During development, run both applications in separate terminals.

 ### Terminal 1 — Backend

```
cd backend
npm run start:dev
```

 Runs on:

```
http://localhost:4000
```

 ### Terminal 2 — Frontend

```
cd frontend
npm run dev
```

 Runs on:

```
http://localhost:3000
```

 Application flow:

```
Browser
   │
   ▼
Next.js :3000
   │
   │ REST API
   ▼
NestJS :4000
   │
   ▼
Prisma
   │
   ▼
PostgreSQL :5432
```

---

 # Validation

 The application performs validation at both frontend and backend levels.

 ### Frontend Validation

 The frontend provides immediate feedback for:

 - Required fields
- Invalid email addresses
- Invalid dates
- Invalid input values

 ### Backend Validation

 The NestJS API independently validates incoming requests.

 Example:

```
export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  studentId: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;
}
```

 Backend validation ensures invalid requests cannot bypass frontend validation and reach the database.

---

 # Error Handling

 The API follows standard HTTP status codes.

 | Status | Meaning |
| --- | --- |
| `200` | Request successful |
| `201` | Resource created |
| `400` | Invalid request |
| `404` | Student not found |
| `409` | Duplicate student information |
| `500` | Internal server error |

 Example error response:

```
{
  "statusCode": 409,
  "message": "Student ID already exists",
  "error": "Conflict"
}
```

---

 # Testing

 The backend uses Jest and Supertest.

 Run unit tests:

```
npm run test
```

 Run tests in watch mode:

```
npm run test:watch
```

 Run end-to-end tests:

```
npm run test:e2e
```

 Generate test coverage:

```
npm run test:cov
```

---

 ## Test Cases

 ### Create Student

 - Create a valid student
- Reject missing required fields
- Reject invalid email
- Reject duplicate student ID
- Reject duplicate email

 ### Read Student

 - Retrieve all students
- Retrieve an existing student
- Return `404` for a non-existent student

 ### Update Student

 - Update an existing student
- Reject invalid update data
- Return `404` when updating a non-existent student

 ### Delete Student

 - Delete an existing student
- Return `404` when deleting a non-existent student

 ### Complete CRUD Workflow

```
Create
  ↓
Read
  ↓
Update
  ↓
Read Updated Record
  ↓
Delete
  ↓
Verify Deleted
```

---

 # Development Workflow

 The project will be developed incrementally.

 ## Phase 1 — Planning

 - Define requirements
- Define student entity
- Design database schema
- Define API contract
- Define CQRS architecture

 ## Phase 2 — UI Prototype

 Design the frontend experience before implementing the complete application.

 Main screens:

```
Dashboard
    │
    ├── Student List
    │
    ├── Add Student
    │
    ├── Student Details
    │
    └── Edit Student
```

 ## Phase 3 — Backend

 Implement:

 - NestJS application
- Students module
- DTOs
- Controllers
- CQRS commands
- CQRS queries
- Command handlers
- Query handlers
- Validation
- Error handling
- Swagger documentation

 ## Phase 4 — Database

 Implement:

 - PostgreSQL connection
- Prisma schema
- Database migrations
- Prisma service
- Seed data

 ## Phase 5 — CRUD

 Implement:

```
CreateStudent
GetStudents
GetStudent
UpdateStudent
DeleteStudent
```

 ## Phase 6 — Frontend Integration

 Connect Next.js to the NestJS REST API.

```
Next.js
   │
   ├── GET    /api/students
   ├── GET    /api/students/:id
   ├── POST   /api/students
   ├── PATCH  /api/students/:id
   └── DELETE /api/students/:id
```

 ## Phase 7 — Testing

 Test:

 - API endpoints
- CQRS handlers
- Database operations
- Frontend interactions
- Complete CRUD workflows

 ## Phase 8 — Polish

 - Improve responsive design
- Improve error messages
- Add loading states
- Add empty states
- Improve accessibility
- Add pagination
- Improve search and filtering

---

 # Design Principles

 The backend follows several software engineering principles.

 ### Separation of Concerns

 Frontend, API, application logic, and database access are separated.

 ### CQRS

 Read and write operations are separated through commands and queries.

 ### Single Responsibility

 Each handler is responsible for a specific operation.

```
CreateStudentHandler
        ↓
Creates students

UpdateStudentHandler
        ↓
Updates students

DeleteStudentHandler
        ↓
Deletes students
```

 ### Type Safety

 TypeScript is used across both frontend and backend.

 ### Validation

 Input is validated before reaching the database.

 ### API Documentation

 Swagger provides an interactive API contract.

 ### Automated Testing

 Important application behavior is covered by automated tests.

---

 # Future Improvements

 The initial version focuses on student CRUD operations.

 Potential future features include:

 ### Authentication

 - Admin login
- Staff accounts
- Role-based access control
- JWT authentication

 ### Student Management

 - Student profile photos
- Academic history
- Course enrollment
- Grades
- Attendance
- Student status management

 ### Administration

 - Department management
- Program management
- Staff management
- Audit logs

 ### Reporting

 - Student reports
- PDF exports
- CSV exports
- Dashboard analytics
- Enrollment statistics

 ### Infrastructure

 - Docker
- CI/CD
- Production deployment
- Database backups
- Logging and monitoring

---

 # Project Goals

 This project aims to demonstrate practical understanding of:

 - Full-stack application development
- Next.js
- React
- TypeScript
- NestJS
- CQRS
- REST API design
- PostgreSQL
- Prisma ORM
- Database migrations
- Database seeding
- API validation
- Swagger/OpenAPI
- Unit testing
- Integration testing
- Clean architecture
- Separation of concerns

---

 # License

 This project is developed for educational and portfolio purposes.
