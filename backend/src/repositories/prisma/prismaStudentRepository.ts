import { PrismaService } from 'src/database/prisma.service';
import { Injectable } from '@nestjs/common';
import {
  CreateStudentArgsType,
  ResultStudentType,
  StudentRepository,
  UpdateStudentArgsType,
} from '../studentRepository';

@Injectable()
export class PrismaStudentRepository implements StudentRepository {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string): Promise<ResultStudentType> {
    return await this.prisma.student.findUnique({
      where: { id },
    });
  }

  async findByRA(ra: string): Promise<ResultStudentType> {
    return await this.prisma.student.findUnique({
      where: { ra },
    });
  }

  async list(
    skip: number,
    take: number,
    orderBy?: string,
    sortOrder?: string,
  ): Promise<ResultStudentType[]> {
    const order = {};
    if (orderBy) order[orderBy] = sortOrder;

    return await this.prisma.student.findMany({
      skip,
      take,
      orderBy: order,
    });
  }

  async create({
    name,
    email,
    cpf,
    ra,
  }: CreateStudentArgsType): Promise<ResultStudentType> {
    return await this.prisma.student.create({
      data: {
        name,
        email,
        cpf,
        ra,
      },
    });
  }

  async delete(id: string): Promise<ResultStudentType> {
    return await this.prisma.student.delete({ where: { id } });
  }

  async update(
    id: string,
    { name, email }: UpdateStudentArgsType,
  ): Promise<ResultStudentType> {
    return await this.prisma.student.update({
      where: { id },
      data: {
        name,
        email,
      },
    });
  }
}
