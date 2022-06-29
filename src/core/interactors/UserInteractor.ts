import UserInterface from '../entities/User';
import UserRepository from '../repositories/UserRepository';
import { HTTP_STATUS } from '../const/http';
import { IResponse } from './IResponse';

export default class UserInteractor {
  userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async save(user: UserInterface): Promise<IResponse<string | null>> {
    const savedUser = await this.userRepository.save(user);

    if (savedUser) {
      return {
        status: HTTP_STATUS.OK,
        data: 'User saved successfully',
      };
    }

    return {
      status: HTTP_STATUS.BAD_REQUEST,
      data: null,
      error: 'User could not be saved',
    };
  }

  async getByUsername(username: string): Promise<IResponse<UserInterface | null>> {
    const user = await this.userRepository.getByUsername(username);

    if (user) {
      return {
        status: HTTP_STATUS.OK,
        data: user,
      };
    }

    return {
      status: HTTP_STATUS.NOT_FOUND,
      data: null,
      error: 'User not found',
    };
  }

  async checkPassword(username: string, password: string): Promise<IResponse<boolean>> {
    const isValid = await this.userRepository.checkPassword(username, password);

    if (isValid) {
      return {
        status: HTTP_STATUS.OK,
        data: true,
      };
    }

    return {
      status: HTTP_STATUS.UNAUTHORIZED,
      data: false,
      error: 'Invalid username or password',
    };
  }
};
