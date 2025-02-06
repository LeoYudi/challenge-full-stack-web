export type CreateUserArgsType = {
  login: string;
  password: string;
};

export type UpdateUserArgsType = {
  login?: string;
  password?: string;
};

export type ResultUserType = {
  id: string;
  login: string;
  password: string;
} | null;

export abstract class UserRepository {
  abstract findOne(id: string): Promise<ResultUserType>;

  abstract findByLogin(login: string): Promise<ResultUserType>;

  abstract create(createUserArgs: CreateUserArgsType): Promise<ResultUserType>;

  abstract delete(id: string): Promise<ResultUserType>;

  abstract update(
    id: string,
    updateUserData: UpdateUserArgsType,
  ): Promise<ResultUserType>;
}
