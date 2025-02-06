import { Body, Controller, Post } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentBody } from 'src/dtos/createStudentBody';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Post('create')
  async create(@Body() body: CreateStudentBody) {
    const { name, email, cpf, ra } = body;
    return await this.studentService.create(name, email, cpf, ra);
  }
}
