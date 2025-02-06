import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ValidateCPF } from 'src/validators/cpf.validator';

export class CreateStudentBody {
  @IsNotEmpty({
    message: 'Field `name` should not be empty',
  })
  @IsString({
    message: 'Field `name` should be a text',
  })
  name: string;

  @IsNotEmpty({
    message: 'Field `email` should not be empty',
  })
  @IsString({
    message: 'Field `email` should be a text',
  })
  @IsEmail(
    {},
    {
      message: 'Field `email` is invalid',
    },
  )
  email: string;

  @IsNotEmpty({
    message: 'Field `ra` should not be empty',
  })
  @IsString({
    message: 'Field `ra` should be a text',
  })
  ra: string;

  @IsNotEmpty({
    message: 'Field `cpf` should not be empty',
  })
  @IsString({
    message: 'Field `cpf` should be a text',
  })
  @ValidateCPF({
    message: 'Field `cpf` is invalid',
  })
  cpf: string;
}
