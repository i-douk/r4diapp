const podcastersRouter = require('express').Router()
import  Podcaster  from '../../models/podcaster';

//get all users , their podcasters subscription and their followed podcasts
podcastersRouter.get('/', async (_req, res) => {
    const podcasters = await Podcaster.findAll({});
    res.json(podcasters);

});

//create a new podcaster
podcastersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body

    const podcaster = await Podcaster.create({
      username: username,
      name: name,
      password: password
    });
    res.json(podcaster);

});

export default podcastersRouter;