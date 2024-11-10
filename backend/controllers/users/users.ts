const usersRouter = require('express').Router();
import { Request, Response } from 'express';
import tokenExtractor  from '../../utils/middleware';
import { sequelize } from '../../utils/db';
import models from '../../models';
import { UserDTO } from '../../dtos/UserDTO';
import { JWTRequest } from '../../dtos/types';

//get all users , subscriptions to podcasters and  followed podcasts
usersRouter.get('/', async (_req : Request, res: Response) => {
  const users  = await models.User.scope('defaultScope').findAll({
    include:[
      {
        model: models.Podcast,
        as:'followings',
        attributes: { exclude: [''] },
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
  if(users) {

    const usersDTOs = users.map((user) => new UserDTO(user));
    res.json(usersDTOs);
  } else {
    res.status(404).json({ message : 'users not found'})
  }
});
//get single user by id withsubscriptions to podcasters and  followed podcasts
usersRouter.get('/:id', async (req : Request, res: Response) => {
  const { id } = req.params
  const user  = await models.User.scope('defaultScope').findByPk(id,{
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
        attributes: { exclude: ['username', 'premium' , 'disabled'] },
        through: {
          attributes: { exclude: ['userId','podcasterId']}
        } 
      }, 
    ],
  }) ;
  if(user) {
      const userDTO =  new UserDTO(user);
      res.json(userDTO);
  } else {
    res.status(404).json({message : 'user not found'})
  }
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

// Get a user by id
usersRouter.get('/:id', async (req : Request, res: Response) => {  
  const {id} = req.params
  const user = await models.User.scope('defaultScope').findByPk(id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }

});

// Update a user's name
usersRouter.patch('/:id', tokenExtractor, async (req: JWTRequest, res: Response) => {
  const {id} = req.params
  if(req.decodedToken.id !== Number(id)) {
    res.status(422).json({ message : 'user needs to be logged in to change name'})
  } else {
    const user = await models.User.findByPk(req.params.id);
    if (user) {
      user.name = req.body.name;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  }
});

// Update a user's avatar_url
usersRouter.patch('/:id', tokenExtractor, async (req: JWTRequest, res: Response) => {
  const {id} = req.params

  if(req.decodedToken.id !== Number(id)) {
    res.status(422).json({ message : 'user needs to be logged in to change name'})
  } else {
    const user = await models.User.findByPk(id);
    if (user) {
      user.avatar_url = req.body.avatar_url;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  }
});

// subscribe to podcaster
usersRouter.post('/:id/subscriptions', tokenExtractor, async (req: JWTRequest, res: Response) => {
  const {id} = req.params
  const { podcasterId , stipend } = req.body
  if(req.decodedToken.id !== Number(id)) {
    res.status(422).json({ message : 'user needs to be logged in to subscribe'})
  } else {
    const user = await models.User.findByPk(id);
    const podcaster = await models.Podcaster.findByPk(podcasterId);
    if (user && podcaster) {
      const newRelation = await models.Subscription.create({
        userId : user.id,
        podcasterId,
        stipend,
        paid: stipend > 0 ? true : false
      })
      res.json(newRelation);
    } else {
      res.status(404).json({ error: 'User and podcaster not found' });
    }
  }
});

// follow to podcaster
usersRouter.post('/:id/followings', tokenExtractor, async (req: JWTRequest, res: Response) => {
  const {id} = req.params
  const { podcastId  } = req.body
  if(req.decodedToken.id !== Number(id)) {
    res.status(422).json({ message : 'user needs to be logged in to subscribe'})
  } else {
    const user = await models.User.findByPk(id);
    const podcast = await models.Podcast.findByPk(podcastId);

    if (user && podcast) {
      const newRelation = await models.Following.create({
        userId : user.id,
        podcastId,
      })
      res.json(newRelation);
    } else {
      res.status(404).json({ error: 'User and podcaster not found' });
    }
  }
});

// unfollow podcaster
usersRouter.delete('/:id/followings', tokenExtractor, async (req: JWTRequest, res: Response) => {
  const {id} = req.params
  const { podcastId  } = req.body
  if(req.decodedToken.id !== Number(id)) {
    res.status(422).json({ message : 'user needs to be logged in to subscribe'})
  } else {
    const user = await models.User.findByPk(id);
    const podcast = await models.Podcast.findByPk(podcastId);

    if (user && podcast) {
      await models.Following.destroy({ where: { userId :user.id , podcastId: podcast.id}})
      res.status(200).json({message: 'unfollowed'});
    } else {
      res.status(404).json({ error: 'User and podcaster not found' });
    }
  }
});


// delete user by usename and subsequentely the active session
usersRouter.delete('/:id', tokenExtractor, async (req: JWTRequest, res: Response) => {
  const { id } = req.params
  if(req.decodedToken.id !== Number(id)) {
    res.status(422).json({ message : 'user needs to be logged in to subscribe'})
  } else {
  const user = await models.User.findByPk(req.params.id);
  if (user) {
    await sequelize.transaction(async (transaction) => {
      await models.ActiveUserSession.destroy({ where: { userId: user.id }, transaction });
      await models.User.destroy({ where: { id: user.id }, transaction });
    });
    res.status(204).end(); 
  } else {
    res.status(404).json({ error: 'User not found' });
  } }
});

export default usersRouter;