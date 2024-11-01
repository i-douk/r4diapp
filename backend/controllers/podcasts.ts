const podcastsRouter = require('express').Router();
import { Request, Response} from 'express'
import tokenExtractor from "../utils/middleware";
import models from "../models"

podcastsRouter.get('/' , async ( _req : Request, res : Response) => {
  const podcasts = await models.Podcast.findAll({});
  res.json(podcasts);
});

podcastsRouter.post('/:username', tokenExtractor, async ( req : Request, res : Response) => {

    //check if logged podcaster is the one adding the podcaster
    const podcaster = await models.Podcaster.findOne({ where : { username : req.params.username}});
    console.log(podcaster?.toJSON())
    // if checked create the podcast
    if (podcaster ){
        const newpod = await models.Podcast.create({
            ...req.body,
            podcasterId: podcaster.toJSON().id
        })
        res.status(201).json(newpod)
    } else {
        res.status(404).json({ error: 'Cant add podcast to this podcaset' });
    }
});



export default podcastsRouter;

