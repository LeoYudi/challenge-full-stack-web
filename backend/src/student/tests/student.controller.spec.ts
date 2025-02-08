import { Test, TestingModule } from '@nestjs/testing';
import { StudentController } from '../student.controller';
import { StudentService } from '../student.service';
import { CreateStudentBody } from 'src/dtos/createStudentBody';
import { BadRequestException } from '@nestjs/common';

describe('StudentController', () => {
  let studentController: StudentController;

  const mockStudentService = {
    create: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
    list: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
      providers: [{ provide: StudentService, useValue: mockStudentService }],
    }).compile();

    studentController = module.get<StudentController>(StudentController);
  });

  it('should be defined', () => {
    expect(studentController).toBeDefined();
  });

  describe('create', () => {
    it('should call StudentService.create and return student data', async () => {
      mockStudentService.create.mockResolvedValueOnce({
        student: {
          id: 'uuid',
          name: 'newStudent',
          email: 'email',
          cpf: 'cpf',
          ra: 'ra',
        },
      });

      const body: CreateStudentBody = {
        name: 'newStudent',
        email: 'email',
        cpf: 'cpf',
        ra: 'ra',
      };

      const result = await studentController.create(body);

      expect(mockStudentService.create).toHaveBeenCalledWith(
        'newStudent',
        'email',
        'cpf',
        'ra',
      );
      expect(result).toEqual({
        student: {
          id: 'uuid',
          name: 'newStudent',
          email: 'email',
          cpf: 'cpf',
          ra: 'ra',
        },
      });
    });
  });

  describe('delete', () => {
    it('should call StudentService.delete and return the deleted student data', async () => {
      mockStudentService.delete.mockResolvedValueOnce({
        student: {
          id: 'uuid',
          name: 'deletedStudent',
          email: 'email',
          cpf: 'cpf',
          ra: 'ra',
        },
      });

      const result = await studentController.delete('uuid');

      expect(mockStudentService.delete).toHaveBeenCalledWith('uuid');
      expect(result).toEqual({
        student: {
          id: 'uuid',
          name: 'deletedStudent',
          email: 'email',
          cpf: 'cpf',
          ra: 'ra',
        },
      });
    });

    it('should throw BadRequestException if no id is provided', async () => {
      await expect(studentController.delete('')).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('update', () => {
    it('should call StudentService.update and return the updated student data', async () => {
      mockStudentService.update.mockResolvedValueOnce({
        student: {
          id: 'uuid',
          name: 'updatedStudent',
          email: 'newEmail',
          cpf: 'cpf',
          ra: 'ra',
        },
      });

      const result = await studentController.update('uuid', {
        name: 'updatedStudent',
        email: 'newEmail',
      });

      expect(mockStudentService.update).toHaveBeenCalledWith(
        'uuid',
        'updatedStudent',
        'newEmail',
      );
      expect(result).toEqual({
        student: {
          id: 'uuid',
          name: 'updatedStudent',
          email: 'newEmail',
          cpf: 'cpf',
          ra: 'ra',
        },
      });
    });

    it('should throw BadRequestException if no id is provided', async () => {
      await expect(studentController.update('', {})).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('list', () => {
    it('should call StudentService.list and return the list of students', async () => {
      mockStudentService.list.mockResolvedValueOnce({
        students: [
          {
            id: 'uuid 1',
            name: 'student 1',
            email: 'email 1',
            cpf: 'cpf 1',
            ra: 'ra 1',
          },
          {
            id: 'uuid 2',
            name: 'student 2',
            email: 'email 2',
            cpf: 'cpf 2',
            ra: 'ra 2',
          },
        ],
      });

      const result = await studentController.list({
        page: '1',
        perPage: '2',
        sortOrder: 'asc',
        orderBy: 'name',
      });

      expect(mockStudentService.list).toHaveBeenCalledWith(1, 2, 'asc', 'name');
      expect(result).toEqual({
        students: [
          {
            id: 'uuid 1',
            name: 'student 1',
            email: 'email 1',
            cpf: 'cpf 1',
            ra: 'ra 1',
          },
          {
            id: 'uuid 2',
            name: 'student 2',
            email: 'email 2',
            cpf: 'cpf 2',
            ra: 'ra 2',
          },
        ],
      });
    });
  });
});
