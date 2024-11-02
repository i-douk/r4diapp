const subscriptionsRouter = require('express').Router();
import { Response } from 'express';
import models from '../models';
import tokenExtractor from "../utils/middleware";

subscriptionsRouter.post('/', tokenExtractor, async (
  req: { decodedToken: { id: number; }; body: { podcasterId: any; userId: number; };},
  res: Response) => {
  if (req.decodedToken.id !== Number(req.body.userId)) {
    res.status(401)
      .json({ error: 'You must be authenticated to subscribe!'});
  }
  const subscriptionAddition = {
    podcasterId : req.body.podcasterId,
    userId:req.body.userId,
    paid: true
  };
  console.log(subscriptionAddition);
    
  await models.Subscription.create(subscriptionAddition);
  res.status(201).send(subscriptionAddition);
});

// add subscription to podcaster by authenticated user
subscriptionsRouter.patch('/:username/:id', tokenExtractor, async (
  req: { decodedToken: { id: number; }; body: { podcasterId: string; }; params: { id: string; }; } ,
  res: Response) => {

  if (req.decodedToken.id !== Number(req.body.podcasterId)) {
    res.status(401)
      .json({ error: 'You must be authenticated to subscribe to a podcaster!'});
  }

  const { id } = req.params;
  const payedSubscription =  await models.Subscription.findByPk(id)
  if(payedSubscription){
    payedSubscription.paid = true
    await payedSubscription.save();
    res.status(201).send(payedSubscription);
  } else {
    res.status(401).json({error: "Can't subscribe to this pdocaster"})
  }
});

export default subscriptionsRouter;