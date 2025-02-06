import { IsNotEmpty, IsString } from 'class-validator';

export class LoginBody {
  @IsNotEmpty({
    message: 'Field `login` should not be empty',
  })
  @IsString({
    message: 'Field `login` should be a text',
  })
  login: string;

  @IsNotEmpty({
    message: 'Field `password` should not be empty',
  })
  @IsString({
    message: 'Field `password` should be a text',
  })
  password: string;
}
