import express from 'express';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { breweryInteractor, userInteractor } from '../../core/interactors';
import config from '../../config';

const breweryController = express.Router();
const SECRET = config.app.secret;

const authMiddleware = async (req: Request, res: Response, next: () => void) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.sendStatus(401);
  }

  try {
    const [, token] = authorization.split(' ');
    const decodedToken = jwt.verify(token, SECRET);
    const { username } = (<any>decodedToken);
    const { status, error } = await userInteractor.getByUsername(username);

    if (status !== 200 && error) {
      return res.sendStatus(status);
    }

    next();
  } catch (error) {
    return res.sendStatus(401);
  }
};

/**
 * @swagger
 * /breweries:
 *   get:
 *     summary: Get all breweries based on query param.
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: Search for breweries based on a search term.
 *         example: 'dog'
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Bearer token.
 *     responses:
 *       200:
 *         description: Breweries that match the search term.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   example:
 *                     [{"id":"banjo-brewing-fayetteville","name":"Banjo Brewing","brewery_type":"planning","street":null,"address_2":null,"address_3":null,"city":"Fayetteville","state":"West Virginia","county_province":null,"postal_code":"25840","country":"United States","longitude":null,"latitude":null,"phone":"3042164231","website_url":null,"updated_at":"2021-10-23T02:24:55.243Z","created_at":"2021-10-23T02:24:55.243Z"}]
*/
breweryController.get('/', authMiddleware, async (req: Request, res: Response) => {
  const breweryQuery = req.query.query;
  const query = breweryQuery ? breweryQuery.toString() : null;

  try {
    const { status, data, error } = query ? (
      await breweryInteractor.getByQuery(query)
    ) : (await breweryInteractor.getAll());

    return res.status(status).json({ data, error });
  } catch (error) {
    return res.sendStatus(500);
  }
});

export default breweryController;
