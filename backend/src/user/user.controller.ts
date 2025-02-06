import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserBody } from 'src/dtos/createUserBody';
import { LoginBody } from 'src/dtos/loginBody';
import { Public } from 'src/decorators/public.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  async signUp(@Body() body: CreateUserBody) {
    const { login, password } = body;
    return await this.userService.signUp(login, password);
  }

  @Public()
  @Post('signin')
  async signin(@Body() body: LoginBody) {
    const { login, password } = body;
    return await this.userService.signIn(login, password);
  }
}
