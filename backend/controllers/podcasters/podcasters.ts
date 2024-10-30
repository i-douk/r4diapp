const podcastersRouter = require('express').Router()
import  Podcaster  from '../../models/podcaster';

//get all users , their podcasters subscription and their followed podcasts
podcastersRouter.get('/', async (_req, res) => {
  try {
    const podcasters = await Podcaster.findAll({});
    res.json(podcasters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

//create a new podcaster
podcastersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body
  try {

    const podcaster = await Podcaster.create({
      username: username,
      name: name,
      password: password
    });
    res.json(podcaster);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: 'Failed to create podcaster' });
  }
});

export default podcastersRouter;