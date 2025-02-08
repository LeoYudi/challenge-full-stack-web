import { Test, TestingModule } from '@nestjs/testing';
import { StudentRepository } from 'src/repositories/studentRepository';
import { StudentService } from '../student.service';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

describe('StudentService', () => {
  let studentService: StudentService;

  const mockStudentRepository = {
    findByRA: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
    list: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        { provide: StudentRepository, useValue: mockStudentRepository },
      ],
    }).compile();

    studentService = module.get<StudentService>(StudentService);
  });

  it('should be defined', () => {
    expect(studentService).toBeDefined();
  });

  describe('create', () => {
    it('should throw BadRequestException if student already exists', async () => {
      mockStudentRepository.findByRA.mockResolvedValueOnce({
        id: 'uuid',
        name: 'existingStudent',
        email: 'email',
        ra: '123',
        cpf: '123',
      });

      await expect(
        studentService.create('existingStudent', 'email', '123', '123'),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw InternalServerErrorException if student creation fails', async () => {
      mockStudentRepository.findByRA.mockResolvedValueOnce(null);
      mockStudentRepository.create.mockResolvedValueOnce(null);

      await expect(
        studentService.create('existingStudent', 'email', '123', '123'),
      ).rejects.toThrow(InternalServerErrorException);
    });

    it('should create a new student and return student data', async () => {
      mockStudentRepository.findByRA.mockResolvedValueOnce(null);
      mockStudentRepository.create.mockResolvedValueOnce({
        id: 'uuid',
        name: 'existingStudent',
        email: 'email',
        ra: '123',
        cpf: '123',
      });

      const result = await studentService.create(
        'existingStudent',
        'email',
        '123',
        '123',
      );

      expect(mockStudentRepository.create).toHaveBeenCalledWith({
        name: 'existingStudent',
        email: 'email',
        ra: '123',
        cpf: '123',
      });

      expect(result).toEqual({
        student: {
          id: 'uuid',
          name: 'existingStudent',
          email: 'email',
          ra: '123',
          cpf: '123',
        },
      });
    });
  });

  describe('delete', () => {
    it('should throw NotFoundException if student does not exists', async () => {
      mockStudentRepository.findOne.mockResolvedValueOnce(null);

      await expect(studentService.delete('uuid')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw InternalServerErrorException if student deletion fails', async () => {
      mockStudentRepository.findOne.mockResolvedValueOnce({
        id: 'uuid',
        name: 'student',
        email: 'email',
        ra: '123',
        cpf: '123',
      });
      mockStudentRepository.delete.mockResolvedValueOnce(null);

      await expect(studentService.delete('uuid')).rejects.toThrow(
        InternalServerErrorException,
      );
    });

    it('should delete a new student and return student data', async () => {
      mockStudentRepository.findOne.mockResolvedValueOnce({
        id: 'uuid',
        name: 'student',
        email: 'email',
        ra: '123',
        cpf: '123',
      });
      mockStudentRepository.delete.mockResolvedValueOnce({
        id: 'uuid',
        name: 'student',
        email: 'email',
        ra: '123',
        cpf: '123',
      });

      const result = await studentService.delete('uuid');

      expect(mockStudentRepository.delete).toHaveBeenCalledWith('uuid');

      expect(result).toEqual({
        student: {
          id: 'uuid',
          name: 'student',
          email: 'email',
          ra: '123',
          cpf: '123',
        },
      });
    });
  });

  describe('update', () => {
    it('should throw NotFoundException if student does not exists', async () => {
      mockStudentRepository.findOne.mockResolvedValueOnce(null);

      await expect(studentService.update('uuid', '', '')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw InternalServerErrorException if student update fails', async () => {
      mockStudentRepository.findOne.mockResolvedValueOnce({
        id: 'uuid',
        name: 'student',
        email: 'email',
        ra: '123',
        cpf: '123',
      });
      mockStudentRepository.update.mockResolvedValueOnce(null);

      await expect(studentService.update('uuid', '', '')).rejects.toThrow(
        InternalServerErrorException,
      );
    });

    it('should update a new student and return student data', async () => {
      mockStudentRepository.findOne.mockResolvedValueOnce({
        id: 'uuid',
        name: 'student',
        email: 'email',
        ra: '123',
        cpf: '123',
      });
      mockStudentRepository.update.mockResolvedValueOnce({
        id: 'uuid',
        name: 'student',
        email: 'email',
        ra: '123',
        cpf: '123',
      });

      const result = await studentService.update('uuid', 'newName', 'newEmail');

      expect(mockStudentRepository.update).toHaveBeenCalledWith('uuid', {
        name: 'newName',
        email: 'newEmail',
      });

      expect(result).toEqual({
        student: {
          id: 'uuid',
          name: 'student',
          email: 'email',
          ra: '123',
          cpf: '123',
        },
      });
    });
  });

  describe('list', () => {
    it('should call StudentRepository with the correct params', async () => {
      mockStudentRepository.list.mockResolvedValueOnce([]);

      const page = 0,
        perPage = 2;

      const result = await studentService.list(page, perPage, 'asc', 'name');

      expect(mockStudentRepository.list).toHaveBeenCalledWith(
        (page - 1) * perPage,
        perPage,
        'asc',
        'name',
      );

      expect(result).toEqual({ students: [] });
    });

    it('should call StudentRepository with the correct params with empty params', async () => {
      mockStudentRepository.list.mockResolvedValueOnce([]);

      const page = 3,
        perPage = 5;

      const result = await studentService.list(page, perPage);

      expect(mockStudentRepository.list).toHaveBeenCalledWith(
        10,
        5,
        undefined,
        undefined,
      );

      expect(result).toEqual({ students: [] });
    });
  });
});
