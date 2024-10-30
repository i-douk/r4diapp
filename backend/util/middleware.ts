import jwt , { JwtPayload } from 'jsonwebtoken';
import User from '../models/user';
import Podcast from '../models/podcast';
import Podcaster from '../models/podcaster';
import ActiveUserSession from '../models/active_user_session';
import ActivePodcasterSession from '../models/active_podcaster_session';
import config from './config';
import { Identifier } from 'sequelize';

const tokenExtractor = async (req: { get: (arg0: string) => any; token: any; decodedToken: jwt.JwtPayload }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string }): any; new(): any } } }, next: () => void) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7);

    const activeUserSession = await ActiveUserSession.findOne({ where: { token } });
    const activePodcasterSession = await ActivePodcasterSession.findOne({ where: { token } });
    if (!activeUserSession || !activePodcasterSession ) {
      return res
        .status(401)
        .json({ error: 'Session expired: please log back in.' });
    }
    if (!config.SECRET) {
        throw new Error("Environment variable SECRET is not defined");
      }
    const decodedToken = jwt.verify(token, config.SECRET) as JwtPayload | string;

    if (typeof decodedToken === 'object' && 'id' in decodedToken && activeUserSession) {
    const user = await User.findByPk(decodedToken.id);
    
    if (user?.disabled) {
      return res.status(401).json({ error: 'User account is banned' });
    }} else {
        throw new Error("Token verification failed: 'id' not found in payload");
      }

    if (typeof decodedToken === 'object' && 'id' in decodedToken && activePodcasterSession) {
    const podcaster = await Podcaster.findByPk(decodedToken.id);
    
    if (podcaster?.disabled) {
      return res.status(401).json({ error: 'Podcaster account is banned' });
    }} else {
        throw new Error("Token verification failed: 'id' not found in payload");
      }

    req.token = token;
    req.decodedToken = decodedToken;
  } else {
    return res
      .status(401)
      .json({ error: 'Authorization token missing: you are not logged in.' })
  }
  next();
}


//Middleware to find podcast by id
const podcastFinder = async (req: { podcast: Podcast | null; params: { id: Identifier | undefined } }, _res: any, next: () => void) => {
  req.podcast = await Podcast.findByPk(req.params.id);
  next()
}

export { tokenExtractor  , podcastFinder }