import UserInterface from '../entities/User';

export default interface UserRepository {
  save(user: UserInterface): Promise<boolean>;
  getByUsername(username: string): Promise<UserInterface | null>;
  checkPassword(username: string, password: string): Promise<boolean>;
};
