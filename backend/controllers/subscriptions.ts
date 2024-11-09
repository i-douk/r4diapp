const subscriptionsRouter = require('express').Router();
import {  Response } from 'express';
import models from '../models';
import tokenExtractor from "../utils/middleware";
import { JWTRequest } from '../dtos/types';

// add subscription to podcaster by authenticated user
subscriptionsRouter.post('/', tokenExtractor, async ( req: JWTRequest, res: Response) => {
  const { userId, podcasterId , stipend} = req.body
  if (req.decodedToken.id !== Number(userId)) {
    res.status(401)
      .json({ error: 'You must be authenticated to subscribe to this podcaster!'});
  }
  const existingSusbcription =  await models.Subscription.findOne({ where : 
    { userId:userId,
      podcasterId: podcasterId
    }})
    if(!existingSusbcription){
      const subscriptionAddition = {
        podcasterId,
        userId,
        stipend
      };
        
      await models.Subscription.create(subscriptionAddition);
      res.status(201).send(subscriptionAddition);

    }else{
      res.status(422).json({ message : 'There is already a subscription relation tying this user to this podcaster'})
    }
});

// delete subscription
subscriptionsRouter.delete('/:id', tokenExtractor, async (req: JWTRequest, res: Response) => {
  const { id } = req.params
  const subscriptionToDelete = await models.Subscription.findByPk(id);
  if (subscriptionToDelete && req.decodedToken.id !== subscriptionToDelete.userId) {
    res.status(401)
      .json({ error: 'You must be authenticated to subscribe to this podcaster!'});
  }
  
  if (subscriptionToDelete) {
      await models.Subscription.destroy({ where: { id: subscriptionToDelete.id } });
      res.status(204).end(); 
    } else {
    res.status(404).json({ error: 'There is no subscription with this id' });
  }
});

export default subscriptionsRouter;