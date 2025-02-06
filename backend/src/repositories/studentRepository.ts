export type CreateStudentArgsType = {
  name: string;
  email: string;
  ra: string;
  cpf: string;
};

export type UpdateStudentArgsType = {
  name: string;
  email: string;
};

export type ResultStudentType = {
  id: string;
  name: string;
  email: string;
  ra: string;
  cpf: string;
} | null;

export abstract class StudentRepository {
  abstract findOne(id: string): Promise<ResultStudentType>;

  abstract findByRA(ra: string): Promise<ResultStudentType>;

  abstract list(
    skip: number,
    take: number,
    orderBy?: string,
    sortOrder?: string,
  ): Promise<ResultStudentType[]>;

  abstract create(
    createStudentArgs: CreateStudentArgsType,
  ): Promise<ResultStudentType>;

  abstract delete(id: string): Promise<ResultStudentType>;

  abstract update(
    id: string,
    updateStudentData: UpdateStudentArgsType,
  ): Promise<ResultStudentType>;
}
