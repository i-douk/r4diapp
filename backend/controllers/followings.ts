const followingRouter = require('express').Router();
import { Response } from 'express';
import models from '../models';
import tokenExtractor from "../utils/middleware";
import { JWTRequest } from '../dtos/types';

// add following relation
followingRouter.post('/', tokenExtractor, async ( req: JWTRequest, res: Response) => {
  const { userId, podcastId } = req.body
  if (req.decodedToken.id !== Number(userId)) {
    res.status(401)
      .json({ error: 'You must be authenticated to subscribe to this podcaster!'});
  }
  const existingFollowing =  await models.Following.findOne({ where : 
    { userId,
      podcastId
    }})
    if(!existingFollowing){
      const followingAddition = {
        podcastId,
        userId
      };
        
      await models.Following.create(followingAddition);
      res.status(201).send(followingAddition);

    }else{
      res.status(422).json({ message : 'There is already a following relation tying this user to this podcast'})
    }
});

// delete following relation
followingRouter.delete('/:id', tokenExtractor, async (req: JWTRequest, res: Response) => {
  const { id } = req.params
  const followingToDelete = await models.Following.findByPk(id);
  if (followingToDelete && req.decodedToken.id !== followingToDelete.userId) {
    res.status(401)
      .json({ error: 'You must be authenticated to follow to this podcast!'});
  }
  
  if (followingToDelete) {
      await models.Following.destroy({ where: { id: followingToDelete.id } });
      res.status(204).end(); 
    } else {
    res.status(404).json({ error: 'There is no following relation with this id' });
  }
});

// add starring of podcast by authenticated user
followingRouter.patch('/:id', tokenExtractor, async ( req: JWTRequest ,res: Response ) => {

  const { id } = req.params;
  const followingToStar = await models.Following.findByPk(id);
  if (followingToStar && req.decodedToken.id !== followingToStar.userId) {
    res.status(401)
      .json({ error: 'You must be authenticated to follow to this podcast!'});
  }
  if(followingToStar){
    followingToStar.starred = true
    await followingToStar.save();
    res.status(201).send(followingToStar);
  } else {
    res.status(401).json({error: "This following relation does not exist"})
  }
});

export default followingRouter;