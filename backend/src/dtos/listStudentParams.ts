import { IsIn, IsNotEmpty, IsNumberString } from 'class-validator';

export class ListStudentParams {
  @IsNotEmpty({
    message: 'Query param `page` should not be empty',
  })
  @IsNumberString(
    {},
    {
      message: 'Query param `page` should be a number',
    },
  )
  page: string;

  @IsNotEmpty({
    message: 'Query param `perPage` should not be empty',
  })
  @IsNumberString(
    {},
    {
      message: 'Query param `perPage` should be a number',
    },
  )
  perPage: string;

  @IsIn(['asc', 'desc', undefined], {
    message: 'Query param `sortOrder` should be `asc` or `desc`',
  })
  sortOrder?: 'asc' | 'desc';

  @IsIn(['name', 'email', 'cpf', 'ra', undefined], {
    message: 'Query param `orderBy` should be one field from Student',
  })
  orderBy?: string;
}
