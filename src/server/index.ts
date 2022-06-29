import app from './app';
import sequelize from '../dataSources/sequelize';
import config from '../config';

const PORT = config.app.port;

// connect to db and start server
(async () => {
  await sequelize.sync();
  app.listen(PORT, () => console.log(`[server] 🚀 started on port: ${PORT}`));
})();
