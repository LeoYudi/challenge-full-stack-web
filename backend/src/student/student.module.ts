import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { PrismaService } from 'src/database/prisma.service';
import { StudentRepository } from 'src/repositories/studentRepository';
import { PrismaStudentRepository } from 'src/repositories/prisma/prismaStudentRepository';

@Module({
  controllers: [StudentController],
  providers: [
    StudentService,
    PrismaService,
    {
      provide: StudentRepository,
      useClass: PrismaStudentRepository,
    },
  ],
})
export class StudentModule {}
