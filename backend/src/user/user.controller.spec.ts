import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserBody } from 'src/dtos/createUserBody';
import { LoginBody } from 'src/dtos/loginBody';

describe('UserController', () => {
  let userController: UserController;

  const mockUserService = {
    signUp: jest.fn().mockImplementation((login: string, _password: string) => {
      return Promise.resolve({
        user: { id: 'uuid', login },
      });
    }),
    signIn: jest.fn().mockImplementation((login: string, _password: string) => {
      return Promise.resolve({
        user: {
          id: 'uuid',
          login,
        },
        token: 'token',
      });
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compile();

    userController = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('signUp', () => {
    it('should call UserService.signUp and return user data', async () => {
      const body: CreateUserBody = {
        login: 'admin',
        password: 'admin123',
      };

      const result = await userController.signUp(body);

      expect(mockUserService.signUp).toHaveBeenCalledWith('admin', 'admin123');
      expect(result).toEqual({
        user: { id: 'uuid', login: 'admin' },
      });
    });
  });

  describe('signIn', () => {
    it('should call UserService.signIn and return a JWT token', async () => {
      const body: LoginBody = { login: 'admin', password: 'admin123' };

      const result = await userController.signin(body);

      expect(mockUserService.signIn).toHaveBeenCalledWith('admin', 'admin123');
      expect(result).toEqual({
        user: {
          id: 'uuid',
          login: 'admin',
        },
        token: 'token',
      });
    });
  });
});
