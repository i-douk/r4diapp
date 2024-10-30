import jwt , { JwtPayload } from 'jsonwebtoken';
import User from '../models/user';
import Podcaster from '../models/podcaster';
import ActiveUserSession from '../models/active_user_session';
import ActivePodcasterSession from '../models/active_podcaster_session';
import config from './config';
// import { Identifier } from 'sequelize';

//extract token from user active session and podcaster active session
const tokenExtractor = async (
  req: { get: (arg0: string) => any; token: any; decodedToken: jwt.JwtPayload },
  res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string }): any; new(): any } } },
  next: () => void) => {

  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7)
    const activeUserSession = await ActiveUserSession.findOne({ where: { token } })
    const activePodcasterSession = await ActivePodcasterSession.findOne({ where: { token } })
    if (!activeUserSession && !activePodcasterSession ) {
      return res
        .status(401)
        .json({ error: 'Session expired: please log back in.' })
    }
    if (!config.SECRET) {
        throw new Error("Environment variable SECRET is not defined");
      }
    const decodedToken = jwt.verify(token, config.SECRET) as JwtPayload | string;
    if (typeof decodedToken === 'object' && 'id' in decodedToken) {
    const user = await User.findByPk(decodedToken.id)
    const podcaster = await Podcaster.findByPk(decodedToken.id)
    
  if (user?.disabled) { return res.status(401).json({ error: 'Account is banned' })}
  if (podcaster?.disabled) { return res.status(401).json({ error: 'Account is banned' })}
    } else {
        throw new Error("Token verification failed: 'id' not found in payload");
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

export default tokenExtractor ;