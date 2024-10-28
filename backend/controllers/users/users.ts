const usersRouter = require('express').Router()
import  User  from '../../models/user';
// import Podcaster from '../../models/podcaster';
// import Podcast from '../../models/podcast';
// import { sequelize } from '../../util/db';


//get all users , their podcasters subscription and their followed podcasts
usersRouter.get('/', async (_req, res) => {
  try {
    const users = await User.findAll({
    //   include: [
    //   {
    //     model: Podcast,
    //     as: 'follows',
    //     attributes: { exclude: [''] },      
    //   },
    //   {
    //     model: Podcaster,
    //     as: 'subscriptions', 
    //     attributes: { exclude: [''] },     
    //   }
    // ]
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

//create a new user
usersRouter.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: 'Failed to create user' });
  }
});

export default usersRouter;