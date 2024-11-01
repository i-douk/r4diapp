const usersRouter = require('express').Router();
import  Subscription  from '../models/subscription';
import { Request, Response} from 'express'

usersRouter.get('/', async (_req: Request, res: Response) => {
  
  const subscriptions = await Subscription.findAll({}
);
  res.json(subscriptions);
});

export default usersRouter;