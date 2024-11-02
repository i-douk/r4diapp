const followingRouter = require('express').Router();
import { Response } from 'express';
import models from '../models';
import tokenExtractor from "../utils/middleware";


// add a following association b/w authenticated user and podcast
followingRouter.post('/', tokenExtractor, async (
  req: { decodedToken: { id: number; }; body: { podcastId: any; userId: number; };},
  res: Response) => {

  if (req.decodedToken.id !== Number(req.body.userId)) {
    res.status(401)
      .json({ error: 'You must be authenticated to follow!'});
  }    
  const followingAddition = {
    podcastId : req.body.podcastId,
    userId:req.body.userId
  };  
    
  await models.Following.create(followingAddition);
  res.status(201).send(followingAddition);
});  


// add starring of podcast by authenticated user
followingRouter.patch('/:username/:id', tokenExtractor, async (
  req: { decodedToken: { id: number; }; body: { userId: string; }; params: { id: string; }; } ,
  res: Response) => {

  if (req.decodedToken.id !== Number(req.body.userId)) {
    res.status(401)
      .json({ error: 'You must be authenticated to star a podcast!'});
  }

  const { id } = req.params;
  const followingToStar = await models.Following.findByPk(id)
  if(followingToStar){
    followingToStar.starred = true
    await followingToStar.save();
    res.status(201).send(followingToStar);
  } else {
    res.status(401).json({error: "Can't star this podcast"})
  }
});

export default followingRouter;