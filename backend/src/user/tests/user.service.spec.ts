import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { UserRepository } from 'src/repositories/userRepository';
import { JwtService } from '@nestjs/jwt';
import { Bcrypt } from 'src/utils/bcrypt';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

describe('UserService', () => {
  let userService: UserService;

  const mockUserRepository = {
    findByLogin: jest.fn(),
    create: jest.fn(),
  };

  const mockJwtService = jest.createMockFromModule<JwtService>('@nestjs/jwt');

  mockJwtService.signAsync = jest.fn().mockResolvedValue('token');

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserRepository, useValue: mockUserRepository },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('signUp', () => {
    it('should throw BadRequestException if login already exists', async () => {
      mockUserRepository.findByLogin.mockResolvedValueOnce({
        id: 'uuid',
        login: 'existingUser',
        password: 'hashedPass',
      });

      await expect(
        userService.signUp('existingUser', 'password123'),
      ).rejects.toThrow(BadRequestException);
    });

    it('should create a new user and return user data', async () => {
      mockUserRepository.findByLogin.mockResolvedValueOnce(null);
      mockUserRepository.create.mockResolvedValueOnce({
        id: 'uuid',
        login: 'newUser',
        password: 'hashedPass',
      });

      jest.spyOn(Bcrypt, 'hash').mockResolvedValue('hashedPass');

      const result = await userService.signUp('newUser', 'password123');

      expect(jest.spyOn(mockUserRepository, 'create')).toHaveBeenCalledWith({
        login: 'newUser',
        password: 'hashedPass',
      });

      expect(result).toEqual({
        user: { id: 'uuid', login: 'newUser' },
      });
    });

    it('should throw InternalServerErrorException if user creation fails', async () => {
      mockUserRepository.findByLogin.mockResolvedValueOnce(null);
      mockUserRepository.create.mockResolvedValueOnce(null);

      await expect(
        userService.signUp('newUser', 'password123'),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('signIn', () => {
    it('should throw BadRequestException if user does not exist', async () => {
      mockUserRepository.findByLogin.mockResolvedValueOnce(null);

      await expect(
        userService.signIn('nonexistentUser', 'password123'),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if password is incorrect', async () => {
      mockUserRepository.findByLogin.mockResolvedValueOnce({
        id: 'uuid',
        login: 'testUser',
        password: 'hashedPass',
      });

      jest.spyOn(Bcrypt, 'compare').mockResolvedValue(false);

      await expect(
        userService.signIn('testUser', 'wrongPassword'),
      ).rejects.toThrow(BadRequestException);
    });

    it('should return user data and JWT token if credentials are valid', async () => {
      mockUserRepository.findByLogin.mockResolvedValueOnce({
        id: 'uuid',
        login: 'validUser',
        password: 'hashedPass',
      });

      jest.spyOn(Bcrypt, 'compare').mockResolvedValue(true);

      const result = await userService.signIn('validUser', 'correctPassword');

      expect(jest.spyOn(mockJwtService, 'signAsync')).toHaveBeenCalledWith({
        user: { id: 'uuid', login: 'validUser' },
      });

      expect(result).toEqual({
        user: { id: 'uuid', login: 'validUser' },
        token: 'token',
      });
    });
  });
});
