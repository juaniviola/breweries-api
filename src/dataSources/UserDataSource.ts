import bcrypt from 'bcryptjs';
import UserInterface from '../core/entities/User';
import UserRepository from '../core/repositories/UserRepository';
import UserModel from './sequelize/UserModel';

export default class UserDataSource implements UserRepository {
  public async save(user: UserInterface): Promise<boolean> {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);

      await UserModel.create({
        username: user.username,
        password: hash,
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  public async getByUsername(username: string): Promise<UserInterface | null> {
    try {
      const user = await UserModel.findOne({
        where: {
          username,
        },
      });

      return user;
    } catch (error) {
      return null;
    }
  }

  public async checkPassword(username: string, password: string): Promise<boolean> {
    try {
      const user = await UserModel.findOne({
        where: {
          username,
        },
      });
      if (!user) {
        throw Error('User not found');
      }

      const isValid = await bcrypt.compare(password, user.password);
      return isValid;
    } catch (error) {
      return false;
    }
  }
};
