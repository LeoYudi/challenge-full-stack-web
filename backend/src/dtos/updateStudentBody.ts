import { IsEmail, IsString } from 'class-validator';

export class UpdateStudentBody {
  @IsString({
    message: 'Field `name` should be a text',
  })
  name?: string;

  @IsString({
    message: 'Field `email` should be a text',
  })
  @IsEmail(
    {},
    {
      message: 'Field `email` is invalid',
    },
  )
  email?: string;
}
