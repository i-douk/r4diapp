import { Request, Response } from 'express';
const podcastersRouter = require('express').Router();
import  Podcaster  from '../../models/podcaster';
import tokenExtractor from '../../utils/middleware';

//get all users , their podcasters subscription and their followed podcasts
podcastersRouter.get('/', async (_req: Request, res : Response) => {
    const podcasters = await Podcaster.findAll({});
    res.json(podcasters);

});

//create a new podcaster
podcastersRouter.post('/', async (req : Request, res: Response) => {
  const { username, name, password } = req.body

    const podcaster = await Podcaster.create({
      username: username,
      name: name,
      password: password
    });
    res.json(podcaster);

});

// Update a user's name
podcastersRouter.put('/:username', tokenExtractor, async (req: Request, res: Response) => {
  const podcaster = await Podcaster.findOne({ where: { username: req.params.username } });
  if (podcaster) {
    podcaster.name = req.body.name;
    await podcaster.save();
    res.json(podcaster);
  } else {
    res.status(404).json({ error: 'Podcaster not found' });
  }
});

export default podcastersRouter;