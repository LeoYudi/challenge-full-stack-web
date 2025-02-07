import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { StudentRepository } from 'src/repositories/studentRepository';

@Injectable()
export class StudentService {
  constructor(private studentRepository: StudentRepository) {}

  async create(name: string, email: string, cpf: string, ra: string) {
    const studentExists = await this.studentRepository.findByRA(ra);

    if (studentExists) throw new BadRequestException('Student already exists');

    const newStudent = await this.studentRepository.create({
      name,
      email,
      cpf,
      ra,
    });

    if (!newStudent)
      throw new InternalServerErrorException('Internal server error');

    return {
      student: newStudent,
    };
  }

  async delete(id: string) {
    const student = await this.studentRepository.findOne(id);

    if (!student) throw new NotFoundException('Student not found');

    const result = await this.studentRepository.delete(id);

    if (!result)
      throw new InternalServerErrorException('Internal server error');

    return {
      student: result,
    };
  }
}
