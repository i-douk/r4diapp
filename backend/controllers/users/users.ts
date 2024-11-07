const usersRouter = require('express').Router();
import { Request, Response } from 'express';
import tokenExtractor  from '../../utils/middleware';
import { sequelize } from '../../utils/db';
import models from '../../models';
import { UserDTO } from '../../dtos/UserDTO';

//get all users , subscriptions to podcasters and  followed podcasts
usersRouter.get('/', async (_req : Request, res: Response) => {
  const users  = await models.User.scope('defaultScope').findAll({
    include:[
      {
        model: models.Podcast,
        as:'followings',
        attributes: { exclude: [] },
        through: {
          attributes: { exclude: ['userId', 'podcastId']}
        } 
      }, 
      {
        model: models.Podcaster,
        as:'subscriptions',
        attributes: { exclude: [] },
        through: {
          attributes: { exclude: ['userId','podcasterId']}
        } 
      }, 
    ],
  }) ;

  const usersDTOs = users.map((user) => new UserDTO(user));
  res.json(usersDTOs);
  console.log(users)
});

//create a new user
usersRouter.post('/', async (req : Request, res: Response) => {
  const { username, name, password } = req.body;
  const user = await models.User.create({
    username: username,
    name: name,
    password: password
  });
  res.json(user);

});

// Get a user by username
usersRouter.get('/:username', async (req : Request, res: Response) => {  
  const user = await models.User.scope('defaultScope').findOne({ 
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
  const user = await models.User.findOne({ where: { username: req.params.username } });
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
  const user = await models.User.findOne({ where: { username: req.params.username } });
  if (user) {
    await sequelize.transaction(async (transaction) => {
      await models.ActiveUserSession.destroy({ where: { userId: user.id }, transaction });
      await models.User.destroy({ where: { id: user.id }, transaction });
    });
    res.status(204).end(); 
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

export default usersRouter;