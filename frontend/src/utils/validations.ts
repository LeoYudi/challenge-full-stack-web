export const required = (value: string) => !!value || "Campo obrigatório";

export const emailValidation = (value: string) =>
  /.+@.+\..+/.test(value) || "E-mail inválido";

export const cpfValidation = (value: string) => {
  let sum = 0;
  let rest: number;

  if (value == "00000000000") return "Cpf inválido";
  for (let i = 1; i <= 9; i++)
    sum = sum + parseInt(value.substring(i - 1, i)) * (11 - i);
  rest = (sum * 10) % 11;

  if (rest == 10 || rest == 11) rest = 0;
  if (rest != parseInt(value.substring(9, 10))) return "Cpf inválido";

  sum = 0;
  for (let i = 1; i <= 10; i++)
    sum = sum + parseInt(value.substring(i - 1, i)) * (12 - i);
  rest = (sum * 10) % 11;

  if (rest == 10 || rest == 11) rest = 0;
  if (rest != parseInt(value.substring(10, 11))) return "Cpf inválido";
  return true;
};
