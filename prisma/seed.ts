import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log(' Starting database seed...');

  const students = [
    {
      studentId: 'STU001',
      firstName: 'Kwame',
      lastName: 'Mensah',
      email: 'kwame.mensah@example.com',
      phone: '+233201234567',
      dateOfBirth: new Date('2002-05-14'),
      gender: 'Male',
      department: 'Computer Science',
      program: 'BSc Computer Science',
      enrollmentDate: new Date('2024-09-01'),
    },
    {
      studentId: 'STU002',
      firstName: 'Ama',
      lastName: 'Owusu',
      email: 'ama.owusu@example.com',
      phone: '+233241234568',
      dateOfBirth: new Date('2003-02-21'),
      gender: 'Female',
      department: 'Information Technology',
      program: 'BSc Information Technology',
      enrollmentDate: new Date('2024-09-01'),
    },
    {
      studentId: 'STU003',
      firstName: 'Kofi',
      lastName: 'Asante',
      email: 'kofi.asante@example.com',
      phone: '+233551234569',
      dateOfBirth: new Date('2001-11-08'),
      gender: 'Male',
      department: 'Business Administration',
      program: 'BSc Business Administration',
      enrollmentDate: new Date('2023-09-01'),
    },
    {
      studentId: 'STU004',
      firstName: 'Akosua',
      lastName: 'Adjei',
      email: 'akosua.adjei@example.com',
      phone: '+233261234570',
      dateOfBirth: new Date('2002-07-30'),
      gender: 'Female',
      department: 'Accounting',
      program: 'BSc Accounting',
      enrollmentDate: new Date('2024-09-01'),
    },
    {
      studentId: 'STU005',
      firstName: 'Yaw',
      lastName: 'Boateng',
      email: 'yaw.boateng@example.com',
      phone: '+233271234571',
      dateOfBirth: new Date('2000-12-17'),
      gender: 'Male',
      department: 'Computer Science',
      program: 'BSc Computer Science',
      enrollmentDate: new Date('2022-09-01'),
    },
    {
      studentId: 'STU006',
      firstName: 'Abena',
      lastName: 'Agyeman',
      email: 'abena.agyeman@example.com',
      phone: '+233501234572',
      dateOfBirth: new Date('2003-09-12'),
      gender: 'Female',
      department: 'Computer Science',
      program: 'BSc Computer Science',
      enrollmentDate: new Date('2025-09-01'),
    },
    {
      studentId: 'STU007',
      firstName: 'Daniel',
      lastName: 'Osei',
      email: 'daniel.osei@example.com',
      phone: '+233541234573',
      dateOfBirth: new Date('2002-03-25'),
      gender: 'Male',
      department: 'Engineering',
      program: 'BSc Software Engineering',
      enrollmentDate: new Date('2024-09-01'),
    },
    {
      studentId: 'STU008',
      firstName: 'Adwoa',
      lastName: 'Darko',
      email: 'adwoa.darko@example.com',
      phone: '+233271234574',
      dateOfBirth: new Date('2001-06-18'),
      gender: 'Female',
      department: 'Business Administration',
      program: 'BSc Marketing',
      enrollmentDate: new Date('2023-09-01'),
    },
    {
      studentId: 'STU009',
      firstName: 'Michael',
      lastName: 'Addo',
      email: 'michael.addo@example.com',
      phone: '+233201234575',
      dateOfBirth: new Date('2003-01-10'),
      gender: 'Male',
      department: 'Information Technology',
      program: 'BSc Information Technology',
      enrollmentDate: new Date('2025-09-01'),
    },
    {
      studentId: 'STU010',
      firstName: 'Efua',
      lastName: 'Frimpong',
      email: 'efua.frimpong@example.com',
      phone: '+233241234576',
      dateOfBirth: new Date('2002-10-05'),
      gender: 'Female',
      department: 'Accounting',
      program: 'BSc Accounting',
      enrollmentDate: new Date('2024-09-01'),
    },
  ];

  const result = await prisma.student.createMany({
    data: students,
    skipDuplicates: true,
  });

  console.log(` Created ${result.count} students`);
}

main()
  .catch((error) => {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
