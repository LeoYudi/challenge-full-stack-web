import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserBody } from 'src/dtos/createUserBody';
import { Bcrypt } from 'src/utils/bcrypt';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  async signUp(@Body() body: CreateUserBody) {
    const { login, password } = body;

    const userExists = await this.userService.findByLogin(login);

    if (userExists) throw new BadRequestException('Login already exists');

    const newUser = await this.userService.create({
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
}
