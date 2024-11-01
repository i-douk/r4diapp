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
    console.log(subscriptionAddition)
    
    await models.Subscription.create(subscriptionAddition);
    res.status(201).send(subscriptionAddition);
})

export default subscriptionsRouter;