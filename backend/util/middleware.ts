import jwt , { JwtPayload } from 'jsonwebtoken'
import User from '../models/user.ts'
import Podcast from '../models/podcast.ts'
import ActiveUserSession from '../models/active_user_session.js'
import config from './config.ts'
import { Identifier } from 'sequelize'


const tokenExtractor = async (req: { get: (arg0: string) => any; token: any; decodedToken: jwt.JwtPayload }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string }): any; new(): any } } }, next: () => void) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7)

    const activeUserSession = await ActiveUserSession.findOne({ where: { token } })
    if (!activeUserSession) {
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
    
    if (user?.disabled) {
      return res.status(401).json({ error: 'Account is banned' })
    }} else {
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

//Middleware to check if the user is an admin
// const isAdmin = async (req, res, next) => {
//   try {
//     const user = await User.findByPk(req.decodedToken.id);
//     if (!user.admin) {
//       return res.status(401).json({ error: 'Operation not allowed' });
//     }
//     next();
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Something went wrong' });
//   }
// };

//Middleware to find podcast by id
const podcastFinder = async (req: { podcast: Podcast | null; params: { id: Identifier | undefined } }, _res: any, next: () => void) => {
  req.podcast = await Podcast.findByPk(req.params.id)
  next()
}


module.exports = { tokenExtractor  , podcastFinder }