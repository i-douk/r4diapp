const followListsRouter = require('express').Router();
import { Response } from 'express';
import models from '../models';
import tokenExtractor from "../utils/middleware";

followListsRouter.post('/', tokenExtractor, async (
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
})

export default followListsRouter;