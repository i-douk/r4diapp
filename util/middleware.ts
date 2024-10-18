import jwt from 'jsonwebtoken';
import config from './config.ts';
import Podcaster from '../models/podcaster.ts';
import Podcast from '../models/podcast.ts';
import User from '../models/user.ts';
import ActiveSession from '../models/active_session.ts';

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7)

    const activeSession = await ActiveSession.findOne({ where: { token } })
    if (!activeSession) {
      return res
        .status(401)
        .json({ error: 'Session expired: please log back in.' })
    }

    const decodedToken = jwt.verify(token, config.SECRET)

    const podcaster = await Podcaster.findByPk(decodedToken.id)
    if (podcaster.disabled) {
      return res.status(401).json({ error: 'Account is banned' })
    }

    req.token = token
    req.decodedToken = decodedToken
  } else {
    return res
      .status(401)
      .json({ error: 'Authorization token missing: you are not logged in.' })
  }
  next()
}

//Middleware to check if the user is an admin
const isPremium = async (req, res, next) => {
  try {
    const podcaster = await Podcaster.findByPk(req.decodedToken.id);
    if (!podcaster.premium) {
      return res.status(401).json({ error: 'Operation not allowed' });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

//Middleware to find podcaster by id
const podcasterFinder = async (req, res, next) => {
  req.pdocaster = await Podcaster.findByPk(req.params.id)
  next()
}
//Middleware to find podcaster by id
const podcastFinder = async (req, res, next) => {
  req.pdocast = await Podcast.findByPk(req.params.id)
  next()
}


module.exports = { tokenExtractor , isPremium , podcasterFinder , podcastFinder}