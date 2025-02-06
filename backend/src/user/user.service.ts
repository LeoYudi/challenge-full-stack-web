import { Injectable } from '@nestjs/common';
import {
  CreateUserArgsType,
  UserRepository,
} from 'src/repositories/userRepository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async findOne(id: string) {
    return await this.userRepository.findOne(id);
  }

  async findByLogin(login: string) {
    return await this.userRepository.findByLogin(login);
  }

  async create(user: CreateUserArgsType) {
    return await this.userRepository.create(user);
  }

  async delete(id: string) {
    return await this.userRepository.delete(id);
  }
}
