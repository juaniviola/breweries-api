import express from 'express';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { userInteractor } from '../../core/interactors';
import UserInterface from '../../core/entities/User';
import config from '../../config';

const userController = express.Router();
const SECRET = config.app.secret;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           example: foo
 *         password:
 *           type: string
 *           example: s3cr3t
 */

/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Create a new User.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully.
*/
userController.post('/create', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'username and password are required' });
  }

  try {
    const user: UserInterface = { username, password };
    const { status, data, error } = await userInteractor.save(user);
    return res.status(status).json({ data, error });
  } catch (error) {
    return res.sendStatus(500);
  }
});

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     description: Login a user. Returns a JWT token.
 *     responses:
 *       200:
 *         description: Returns a token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZvbyIsImlhdCI6MTU0NjM3MzU5MiwiZXhwIjoxNTQ2MzczNzkyfQ
*/
userController.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'username and password are required' });
  }

  try {
    const { status, data, error } = await userInteractor.checkPassword(username, password);
    if (data) {
      const token = jwt.sign({ username }, SECRET);
      return res.status(status).json({ token });
    }

    return res.status(status).json({ error });
  } catch (error) {
    return res.sendStatus(500);
  }
});

export default userController;
