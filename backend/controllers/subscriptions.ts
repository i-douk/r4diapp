const usersRouter = require('express').Router();
import  models  from '../models';
import { Request, Response} from 'express';

usersRouter.get('/', async (_req: Request, res: Response) => {
  
  const subscriptions = await models.Subscription.findAll({}
);
  res.json(subscriptions);
});

export default usersRouter;