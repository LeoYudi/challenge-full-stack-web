import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserRepository } from 'src/repositories/userRepository';

import { Bcrypt } from 'src/utils/bcrypt';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(login: string, password: string) {
    const userExists = await this.userRepository.findByLogin(login);

    if (userExists) throw new BadRequestException('Login already exists');

    const newUser = await this.userRepository.create({
      login,
      password: await Bcrypt.hash(password),
    });

    if (!newUser)
      throw new InternalServerErrorException('Internal server error');

    return {
      user: {
        id: newUser.id,
        login: newUser.login,
      },
    };
  }

  async signIn(login: string, password: string) {
    const user = await this.userRepository.findByLogin(login);

    if (!user) throw new BadRequestException('Login or password are invalid');

    if (!(await Bcrypt.compare(password, user.password)))
      throw new BadRequestException('Login or password are invalid');

    const payload = {
      user: {
        id: user.id,
        login: user.login,
      },
    };

    return {
      ...payload,
      token: await this.jwtService.signAsync(payload),
    };
  }
}
