import { Request, Response } from 'express';
const usersRouter = require('express').Router()
import  User  from '../../models/user';
import tokenExtractor  from '../../utils/middleware';
import { sequelize } from '../../utils/db';
import ActiveUserSession from '../../models/active_user_session';
// import Podcaster from '../../models/podcaster';
// import Podcast from '../../models/podcast';
// import { sequelize } from '../../util/db';


//get all users , their podcasters subscription and their followed podcasts
usersRouter.get('/', async (_req : Request, res: Response) => {
    const users = await User.findAll({});
    res.json(users);
});

//create a new user
usersRouter.post('/', async (req : Request, res: Response) => {
  const { username, name, password } = req.body
  const user = await User.create({
      username: username,
      name: name,
      password: password
    });
  res.json(user);

});

// Get a user by username
usersRouter.get('/:username', async (req : Request, res: Response) => {  
    const user = await User.findOne({ 
      where: { username: req.params.username }
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }

});

// Update a user's name
usersRouter.put('/:username', tokenExtractor, async (req: Request, res: Response) => {
    const user = await User.findOne({ where: { username: req.params.username } });
    if (user) {
      user.name = req.body.name;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
});


// delete user by usename and subsequentely the active session
usersRouter.delete('/:username', tokenExtractor, async (req: Request, res: Response) => {
  const user = await User.findOne({ where: { username: req.params.username } });
  if (user) {
      await sequelize.transaction(async (transaction) => {
          await ActiveUserSession.destroy({ where: { userId: user.id }, transaction });
          await User.destroy({ where: { id: user.id }, transaction });
      });
      res.status(204).end(); 
  } else {
      res.status(404).json({ error: 'User not found' });
  }
});

export default usersRouter;