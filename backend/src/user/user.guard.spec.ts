import { UserGuard } from './user.guard';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';

const mockJwtService = {
  verifyAsync: jest.fn(),
} as Partial<JwtService>;

const mockReflector = {
  getAllAndOverride: jest.fn(),
} as Partial<Reflector>;

const mockExecutionContext = {
  switchToHttp: jest.fn().mockReturnValue({
    getRequest: jest.fn(),
  }),
  getHandler: jest.fn(),
  getClass: jest.fn(),
} as Partial<ExecutionContext>;

describe('UserGuard', () => {
  let userGuard: UserGuard;

  beforeEach(() => {
    userGuard = new UserGuard(
      mockJwtService as JwtService,
      mockReflector as Reflector,
    );
  });

  it('should allow access if the route is public', async () => {
    mockReflector.getAllAndOverride = jest.fn().mockReturnValue(true);
    const canActivate = await userGuard.canActivate(
      mockExecutionContext as ExecutionContext,
    );
    expect(canActivate).toBe(true);
  });

  it('should deny access if no token is provided', async () => {
    mockReflector.getAllAndOverride = jest.fn().mockReturnValue(false);
    mockExecutionContext.switchToHttp = jest.fn().mockReturnValue({
      getRequest: jest.fn().mockReturnValue({ headers: {} }),
    });

    await expect(
      userGuard.canActivate(mockExecutionContext as ExecutionContext),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should allow access if the token is valid', async () => {
    mockReflector.getAllAndOverride = jest.fn().mockReturnValue(false);
    mockExecutionContext.switchToHttp = jest.fn().mockReturnValue({
      getRequest: jest.fn().mockReturnValue({
        headers: { authorization: 'Bearer validToken' },
      }),
    });

    mockJwtService.verifyAsync = jest.fn().mockResolvedValue({
      user: { id: 'uuid', login: 'testUser' },
    });

    const canActivate = await userGuard.canActivate(
      mockExecutionContext as ExecutionContext,
    );
    expect(canActivate).toBe(true);
  });

  it('should deny access if the token is invalid', async () => {
    mockReflector.getAllAndOverride = jest.fn().mockReturnValue(false);
    mockExecutionContext.switchToHttp = jest.fn().mockReturnValue({
      getRequest: jest.fn().mockReturnValue({
        headers: { authorization: 'Bearer invalidToken' },
      }),
    });

    mockJwtService.verifyAsync = jest
      .fn()
      .mockRejectedValue(new Error('Invalid Token'));

    await expect(
      userGuard.canActivate(mockExecutionContext as ExecutionContext),
    ).rejects.toThrow(UnauthorizedException);
  });
});
