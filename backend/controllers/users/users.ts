const usersRouter = require('express').Router()
import  User  from '../../models/user';
import tokenExtractor  from '../../utils/middleware';
// import Podcaster from '../../models/podcaster';
// import Podcast from '../../models/podcast';
// import { sequelize } from '../../util/db';
import { Request, Response } from 'express';


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
// Get a user by username
usersRouter.get('/:id', async (req: Request , res: Response) => {  
    const user = await User.findOne({ 
      where: { id: req.params.id }
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

export default usersRouter;