import jwt from 'jsonwebtoken';
import { Router } from 'express';
import config from '../../utils/config';
import ActivePodcasterSession from '../../models/active_podcaster_session';
import bcrypt from 'bcrypt';
import Podcaster from '../../models/podcaster';
import { Request , Response } from 'express';

const loginPodcasterRouter = Router();

loginPodcasterRouter.post('/', async (req : Request, res : Response) => {
  const { username, password } = req.body;

  // Find the podcaster by username
  const podcaster : any = await Podcaster.scope('sensitive').findOne({
    where: { username: username }
  });

  // Check if podcaster exists
  if (!podcaster) {
    return res.status(401).json({
      error: 'invalid username or password'
    });
  }
  // Compare the plaintext password with the hashed password
  const passwordCorrect = await bcrypt.compare(password, podcaster.password);

  // Check if password is correct
  if (!passwordCorrect) {
    return res.status(401).json({
      error: 'invalid podcaster username or password'
    });
  }

  // Check if the account is disabled
  if (podcaster.disabled) {
    return res.status(401).json({
      error: 'podcaster account disabled, please contact admin'
    });
  }

  // Create token payload
  const podcasterForToken = {
    username: podcaster.username,
    id: podcaster.id,
  };

  // Sign the token
  const token = jwt.sign(podcasterForToken, config.SECRET!, { expiresIn: '1h' });

  // Create an active podcaster session
  await ActivePodcasterSession.create({
    token,
    podcasterId: podcaster.id
  });

  // Respond with token and podcaster information
  return res.status(200).send({ token, username: podcaster.username, name: podcaster.name });

});

export default loginPodcasterRouter;
