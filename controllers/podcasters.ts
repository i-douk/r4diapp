import { Request, Response } from "express";
export const podcastersRouter = require('express').Router()
import Podcaster  from '../models/podcaster';

podcastersRouter.get('/', async ( _req : Request, res : Response) => {
  const podcasts = await Podcaster.findAll();
  if(podcasts) {
    res.json(podcasts);
  } else {
    res.status(404).end();
  }
})

podcastersRouter.get('/:id', async ( req : Request, res : Response) => {
  const podcast = await Podcaster.findByPk(req.params.id);
  console.log(podcast)
  if(podcast) {
    res.json(podcast);
  } else {
    res.status(404).end();
  }
})

module.exports = { podcastersRouter }