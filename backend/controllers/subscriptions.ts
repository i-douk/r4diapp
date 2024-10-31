const usersRouter = require('express').Router()
import  SubscriptionList  from '../models/subscription_list';
// import { sequelize } from '../utils/db';

usersRouter.get('/', async (_req: any, res: { json: (arg0: SubscriptionList[]) => void; }) => {
  
  const subscriptions = await SubscriptionList.findAll(
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
  res.json(subscriptions)
})

export default usersRouter;