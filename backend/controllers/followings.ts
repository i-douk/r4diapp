const followingRouter = require('express').Router();
import { Response } from 'express';
import models from '../models';
import tokenExtractor from "../utils/middleware";
import { JWTRequest } from '../dtos/types';

// GET ALL FOLLOWINGS FOR ADMIN AND SUPERUSER
followingRouter.get('/', tokenExtractor, async (req: JWTRequest, res: Response) =>{
  const { role } = req.decodedToken;
  if(role === 'superuser' || role === 'admin'){
    const followings = await models.Following.findAll({});
    res.status(200).json(followings)
  } else {
    res.status(422).json({ message: 'not enough persmissions to access followings'})
  }
  
})

// ADD FOLLOWING RELATION BETWEEN
followingRouter.post('/', tokenExtractor, async ( req: JWTRequest, res: Response) => {
  const { userId, podcastId } = req.body
  const { role } = req.decodedToken;
  if(role === 'superuser' || role === 'admin'){
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
  } else {
    res.status(422).json({ message: 'not enough persmissions to access subscriptions'})
  }
});

// delete following relation
followingRouter.delete('/:id', tokenExtractor, async (req: JWTRequest, res: Response) => {
  const { role } = req.decodedToken;
  if(role === 'superuser' || role === 'admin'){
  const { id } = req.params
  const followingToDelete = await models.Following.findByPk(id);
  
  if (followingToDelete) {
      await models.Following.destroy({ where: { id: followingToDelete.id } });
      res.status(204).end(); 
    } else {
    res.status(404).json({ error: 'There is no following relation with this id' });
  }
} else {
  res.status(422).json({ message: 'not enough persmissions to access subscriptions'})
}
});

// STAR A FOLLOWING RELATION BY ADMIN AND SUPERUSER
followingRouter.patch('/:id', tokenExtractor, async ( req: JWTRequest ,res: Response ) => {
  const { role } = req.decodedToken;
  if(role === 'superuser' || role === 'admin'){
  const { id } = req.params;
  const followingToStar = await models.Following.findByPk(id);

  if(followingToStar){
    followingToStar.starred = true
    await followingToStar.save();
    res.status(201).send(followingToStar);
  } else {
    res.status(401).json({error: "This following relation does not exist"})
  }
} else {
  res.status(422).json({ message: 'not enough persmissions to access subscriptions'})
}
});

export default followingRouter;