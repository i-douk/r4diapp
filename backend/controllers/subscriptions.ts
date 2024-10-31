const usersRouter = require('express').Router();
import  Subscription  from '../models/subscription';
// import { sequelize } from '../utils/db';

usersRouter.get('/', async (_req: any, res: { json: (arg0: Subscription[]) => void; }) => {
  
  const subscriptions = await Subscription.findAll(
    {
    attributes: [
    //     'podcaster',
    //     [sequelize.fn('COUNT', sequelize.col('id')), 'podcasts'],
    //     [sequelize.fn('SUM', sequelize.col('likes')), 'likes']
    //     ],
    // group: 'author',
    // order: [[sequelize.literal('likes'), 'DESC']
  ]
    }
);
  res.json(subscriptions);
});

export default usersRouter;