import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import breweryController from '../controllers/http/BreweryController';
import userController from '../controllers/http/UserController';
import config from '../config';

const app = express();
const swaggerSpec = swaggerJsDoc(config.swagger);

// config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard({ action: 'deny' }));
app.use(morgan('tiny'));

// routes
app.use('/api/v1/user', userController);
app.use('/api/v1/breweries', breweryController);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use('*', (_: Request, res: Response) => res.sendStatus(404));

export default app;
