import { Request, Response } from "express";
export const podcastsRouter = require('express').Router()
import Podcast from '../models/podcast';

podcastsRouter.get('/', async ( _req : Request, res : Response) => {
  const podcasts = await Podcast.findAll();
  if(podcasts) {
    res.json(podcasts);
  } else {
    res.status(404).end();
  }
})

podcastsRouter.get('/:id', async ( req : Request, res : Response) => {
  const podcast = await Podcast.findByPk(req.params.id);
  console.log(podcast)
  if(podcast) {
    res.json(podcast);
  } else {
    res.status(404).end();
  }
})

module.exports = { podcastsRouter }