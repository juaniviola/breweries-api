import { Model, DataTypes, Optional } from 'sequelize';
import UserInterface from '../../core/entities/User';
import sequelizeInstance from './index';

interface UserCreationInterface extends Optional<UserInterface, 'id'> {}

class User extends Model<UserInterface, UserCreationInterface> implements UserInterface {
  public id: number;
  public username: string;
  public password: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}

User.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
  sequelize: sequelizeInstance,
});

export default User;
