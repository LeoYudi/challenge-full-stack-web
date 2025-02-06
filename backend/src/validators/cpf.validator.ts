import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function ValidateCPF(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'ValidateCPF',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string, _args: ValidationArguments) {
          let sum = 0;
          let rest: number;

          if (value == '00000000000') return false;
          for (let i = 1; i <= 9; i++)
            sum = sum + parseInt(value.substring(i - 1, i)) * (11 - i);
          rest = (sum * 10) % 11;

          if (rest == 10 || rest == 11) rest = 0;
          if (rest != parseInt(value.substring(9, 10))) return false;

          sum = 0;
          for (let i = 1; i <= 10; i++)
            sum = sum + parseInt(value.substring(i - 1, i)) * (12 - i);
          rest = (sum * 10) % 11;

          if (rest == 10 || rest == 11) rest = 0;
          if (rest != parseInt(value.substring(10, 11))) return false;
          return true;
        },
      },
    });
  };
}
