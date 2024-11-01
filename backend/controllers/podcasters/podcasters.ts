import { Request, Response } from 'express';
const podcastersRouter = require('express').Router();
import  models  from '../../models';
import tokenExtractor from '../../utils/middleware';
import ActivePodcasterSession from '../../models/active_podcaster_session';
import { sequelize } from '../../utils/db';

//get all users , their podcasters subscription and their followed podcasts
podcastersRouter.get('/', async (_req: Request, res : Response) => {
    const podcasters = await models.Podcaster.findAll({
         include:[
          {
            model: models.Podcast,
            as: 'podcasts',
            attributes: { exclude: ['podcasterId'] }
          },
          {
            model: models.User,
            as:'subscribers',
            attributes: { exclude: ['userId'] }
          },
         ]  
    }) ;
    res.json(podcasters);
});

//create a new podcaster
podcastersRouter.post('/', async (req : Request, res: Response) => {
  const { username, name, password } = req.body;

    const podcaster = await models.Podcaster.create({
      username: username,
      name: name,
      password: password
    });
    res.json(podcaster);

});

// Update a user's name
podcastersRouter.put('/:username', tokenExtractor, async (req: Request, res: Response) => {
  const podcaster = await models.Podcaster.findOne({ where: { username: req.params.username }});
  console.log(podcaster);
  if (podcaster) {
    podcaster.name = req.body.name;
    await podcaster.save();
    res.json(podcaster);
  } else {
    res.status(404).json({ error: 'Podcaster not found' });
  }
});

// add a podcast for a podcaster
podcastersRouter.post('/:username/podcasts', tokenExtractor, async (req: Request, res: Response) => {
  const podcaster = await models.Podcaster.findOne({ where: { username: req.params.username } });
  if (podcaster) {
    const newPodcast = await models.Podcast.create({ ...req.body, podcasterId: podcaster.id }) ;
    res.status(201).json(newPodcast);
  } else {
    res.status(404).json({ error: 'Podcaster not found' });
  }
});

// Delete podcaster by usename and subsequentely the active session
podcastersRouter.delete('/:username', tokenExtractor, async (req: Request, res: Response) => {
  const podcaster = await models.Podcaster.findOne({ where: { username: req.params.username } });
  if (podcaster) {
      await sequelize.transaction(async (transaction) => {
          await ActivePodcasterSession.destroy({ where: { podcasterId: podcaster.id }, transaction });
          await models.Podcaster.destroy({ where: { id: podcaster.id }, transaction });
      });
      res.status(204).end(); 
  } else {
      res.status(404).json({ error: 'Podcaster not found' });
  }
});


export default podcastersRouter;