import 'dotenv/config';

const { ENV } = process.env;

export default {
  app: {
    port: process.env.PORT,
    secret: process.env.SECRET,
  },
  db: {
    url: ENV === 'dev' ? process.env.DB_URL_DEV : process.env.DB_URL_PROD,
  },
  business: {
    brewery: {
      url: process.env.BREWERY_URL,
      search: process.env.BREWERY_SEARCH,
    },
  },
  swagger: {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Api Documentation for Bewery',
        version: '1.0.0',
        description:
          'This is a REST app.',
        license: {
          name: 'Licensed Under MIT',
          url: 'https://spdx.org/licenses/MIT.html',
        },
      },
      servers: [
        {
          url: `http://localhost:${process.env.PORT}/api/v1`,
          description: 'Development server',
        },
      ],
    },
    baseUrl: `http://localhost:${process.env.PORT}/api/v1`,
    apis: ['./src/controllers/http/*.ts', './http/*.ts', './*.ts'],
  },
};
