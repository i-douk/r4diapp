const usersRouter = require('express').Router()
import  User  from '../../models/user';
import { tokenExtractor } from '../../util/middleware';
// import Podcaster from '../../models/podcaster';
// import Podcast from '../../models/podcast';
// import { sequelize } from '../../util/db';


//get all users , their podcasters subscription and their followed podcasts
usersRouter.get('/', async (_req, res) => {
  try {
    const users = await User.findAll({});
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

//create a new user
usersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body
  try {

    const user = await User.create({
      username: username,
      name: name,
      password: password
    });
    res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: 'Failed to create user' });
  }
});

// Get a user by username
usersRouter.get('/:username', async (req, res) => {  
  try {
    const user = await User.findOne({ 
      where: { username: req.params.username }
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Update a user's name
usersRouter.put('/:username', tokenExtractor, async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.params.username } });
    if (user) {
      user.name = req.body.name;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

export default usersRouter;