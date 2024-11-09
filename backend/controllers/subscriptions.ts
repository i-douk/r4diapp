const subscriptionsRouter = require('express').Router();
import {  Response } from 'express';
import models from '../models';
import tokenExtractor from "../utils/middleware";
import {sequelize} from '../utils/db';
import { JWTRequest } from '../dtos/types';


// add subscription to podcaster by authenticated user
subscriptionsRouter.post('/', tokenExtractor, async ( req: JWTRequest, res: Response) => {
  if (req.decodedToken.id !== Number(req.body.userId)) {
    res.status(401)
      .json({ error: 'You must be authenticated to subscribe to this podcaster!'});
  }
  const subscriptionAddition = {
    podcasterId : req.body.podcasterId,
    userId:req.body.userId,
    stipend: req.body.stipend
  };
  console.log(subscriptionAddition);
    
  await models.Subscription.create(subscriptionAddition);
  res.status(201).send(subscriptionAddition);
});

// delete subscription
subscriptionsRouter.delete('/:id', tokenExtractor, async (req: JWTRequest, res: Response) => {
  if (req.decodedToken.id !== Number(req.body.userId)) {
    res.status(401)
      .json({ error: 'You must be authenticated to subscribe to this podcaster!'});
  }
  
  const subscriptionToDelete = await models.Subscription.findByPk(req.params.id);
  if (subscriptionToDelete) {
      await models.Subscription.destroy({ where: { id: subscriptionToDelete.id } });
      res.status(204).end(); 
    } else {
    res.status(404).json({ error: 'There is no subscription with this id' });
  }
});

export default subscriptionsRouter;