import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/database/prisma.service';
import { UserRepository } from 'src/repositories/userRepository';
import { PrismaUserRepository } from 'src/repositories/prisma/prismaUserRepository';
import { jwtConstants } from 'src/constants/jwt';
import { APP_GUARD } from '@nestjs/core';
import { UserGuard } from './user.guard';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UserController],
  providers: [
    PrismaService,
    UserService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: APP_GUARD,
      useClass: UserGuard,
    },
  ],
})
export class UserModule {}
