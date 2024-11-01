const podcastsRouter = require('express').Router();
import { Request, Response} from 'express'
import tokenExtractor from "../utils/middleware";
import models from "../models"

// fetch all podcasts
podcastsRouter.get('/' , async ( _req : Request, res : Response) => {
  const podcasts = await models.Podcast.findAll({});
  res.json(podcasts);
});

// fetch all porcasts added by a podcaster
podcastsRouter.get('/:username' , async ( req : Request, res : Response) => {
  const podcaster = await models.Podcaster.findOne({ where : { username : req.params.username}});
  if(podcaster){

      const podcasts = await models.Podcast.findAll({ where: { podcaster_id: podcaster?.toJSON().id}});
      res.json(podcasts);
  } else {
    res.status(404).json({ error : 'podcaster not found'})
  }
});
// add podcast by current podcaster
podcastsRouter.post('/:username', tokenExtractor, async ( req : Request, res : Response) => {

    //check if logged podcaster is the one adding the podcaster
    const podcaster = await models.Podcaster.findOne({ where : { username : req.params.username}});
    const activePodcaster = await models.ActivePodcasterSession.findByPk(podcaster?.toJSON().id)
    console.log(podcaster?.toJSON() && activePodcaster)
    // if checked create the podcast
    if (podcaster ){
        const newpod = await models.Podcast.create({
            ...req.body,
            podcaster_id: podcaster.toJSON().id
        })
        res.status(201).json(newpod)
    } else {
        res.status(404).json({ error: 'Cant add podcast to this podcast' });
    }
});



export default podcastsRouter;

