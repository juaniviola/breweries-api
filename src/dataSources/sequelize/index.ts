import { Sequelize } from 'sequelize';
import config from '../../config';

const DB_URL = config.db.url;
const sequelize = new Sequelize(DB_URL);

export default sequelize;
