const subscriptionsRouter = require('express').Router();
import {  Response } from 'express';
import models from '../models';
import tokenExtractor from "../utils/middleware";
import { JWTRequest } from '../dtos/types';

// GET ALL SUBSCRIPTIONS FOR ADMIN AND SUPERUSER
subscriptionsRouter.get('/', tokenExtractor, async (req: JWTRequest, res: Response) =>{
  const { role } = req.decodedToken;
  if(role === 'superuser' || role === 'admin'){
    const subscriptions = await models.Subscription.findAll({});
    res.status(200).json(subscriptions)
  } else {
    res.status(422).json({ message: 'not enough persmissions to access subscriptions'})
  }
})

// add subscription to podcaster by authenticated user
subscriptionsRouter.post('/', tokenExtractor, async ( req: JWTRequest, res: Response) => {
  const { role } = req.decodedToken;
  if(role === 'superuser' || role === 'admin'){
  const { userId, podcasterId , stipend} = req.body
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
  } else {
    res.status(422).json({ message: 'not enough persmissions to access subscriptions'})
  }
});

// ALLOW SUPERUSER TO FREEZE SUBSCRIPTION
subscriptionsRouter.patch('/:id', tokenExtractor, async ( req: JWTRequest, res: Response) => {
  const { role } = req.decodedToken;
  const { id } = req.params;
  const { frozen }  = req.body; 
  if(role === 'superuser'){
  const existingSusbcription =  await models.Subscription.findByPk(id);
    if(existingSusbcription){
      existingSusbcription.frozen = frozen ;
      await existingSusbcription.save();
      res.status(200).send(existingSusbcription);
    }else{
      res.status(422).json({ message : 'This subscription does not exist'});
    }
  } else {
    res.status(422).json({ message: 'not enough persmissions to access subscriptions'});
  }
});

// ALLOW SUPERUSER AND ADMIN TO ADD COMMENTS TO THE SUBSCRIPTION
subscriptionsRouter.post('/:id', tokenExtractor, async ( req: JWTRequest, res: Response) => {
  const { role } = req.decodedToken;
  const { id } = req.params;
  const { comment } = req.body;
  
  if(role === 'superuser' || role === 'admin'){
  const subscriptionToComment =  await models.Subscription.findByPk(id);
    if(subscriptionToComment){
      let currentComments : string[]= subscriptionToComment.comments || []; 
      currentComments.push(`${role} commented: ${comment}`);
      subscriptionToComment.comments = currentComments; 
      subscriptionToComment.save();
      res.status(201).send(subscriptionToComment);
    }else{
      res.status(422).json({ message : 'This subscription does not exist'});
    }
  } else {
    res.status(422).json({ message: 'not enough persmissions to access subscriptions'});
  }
});

// delete subscription
subscriptionsRouter.delete('/:id', tokenExtractor, async (req: JWTRequest, res: Response) => {
  const { role } = req.decodedToken;
  if(role === 'superuser' || role === 'admin'){
  const { id } = req.params
  const subscriptionToDelete = await models.Subscription.findByPk(id);
  
  if (subscriptionToDelete) {
      await models.Subscription.destroy({ where: { id: subscriptionToDelete.id } });
      res.status(204).end(); 
    } else {
    res.status(404).json({ error: 'There is no subscription with this id' });
  }
} else {
  res.status(422).json({ message: 'not enough persmissions to access subscriptions'})
}
});

export default subscriptionsRouter;