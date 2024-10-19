const usersRouter = require('express').Router()
import  SubscriptionList  from '../models/subscription_list';
// import { sequelize } from '../../util/db';

usersRouter.get('/', async (_req: any, res: { json: (arg0: SubscriptionList[]) => void; }) => {
  
  const subscriptions = await SubscriptionList.findAll(
    // {
    // attributes: [
    //     'author',
    //     [sequelize.fn('COUNT', sequelize.col('id')), 'articles'],
    //     [sequelize.fn('SUM', sequelize.col('likes')), 'likes']
    //     ],
    // group: 'author',
    // order: [[sequelize.literal('likes'), 'DESC']]
    // }
);
  res.json(subscriptions)
})

export default usersRouter;