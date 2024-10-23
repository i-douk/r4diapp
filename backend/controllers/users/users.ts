const usersRouter = require('express').Router()
import  User  from '../../models/user';
import Podcaster from '../../models/podcaster';
import Podcast from '../../models/podcast';
// import { sequelize } from '../../util/db';

usersRouter.get('/', async (_req: any, res: { json: (arg0: User[]) => void; }) => {
  
    const users = await User.findAll({
        include: [{
            model: Podcaster,
            attributes: { exclude: ['userId'] }
          },
          {
            model: Podcast, 
            attributes: ['name', 'description'], 
          }
       ]
      });
      res.json(users);
})

export default usersRouter;