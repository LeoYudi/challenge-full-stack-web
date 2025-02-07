import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentBody } from 'src/dtos/createStudentBody';
import { UpdateStudentBody } from 'src/dtos/updateStudentBody';
import { ListStudentParams } from 'src/dtos/listStudentParams';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Post('create')
  async create(@Body() body: CreateStudentBody) {
    const { name, email, cpf, ra } = body;
    return await this.studentService.create(name, email, cpf, ra);
  }

  @Delete(':id')
  async delete(@Param('id') id?: string) {
    if (!id) throw new BadRequestException('Param `id` should not be empty');
    return await this.studentService.delete(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateStudentBody) {
    if (!id) throw new BadRequestException('Param `id` should not be empty');

    return await this.studentService.update(id, body?.name, body?.email);
  }

  @Get()
  async list(@Query() queryParams: ListStudentParams) {
    const { page, perPage, sortOrder, orderBy } = queryParams;
    return await this.studentService.list(+page, +perPage, sortOrder, orderBy);
  }
}
