import jwt from 'jsonwebtoken';
const loginUserRouter = require('express').Router();
import  config  from '../../util/config';
import User from '../../models/user';
import ActiveUserSession  from '../../models/active_user_session';

loginUserRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({
    where: {
      username: body.username
    }
  })

  const passwordCorrect = body.password === 'secret'

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  if (user.disabled) {
    return response.status(401).json({
      error: 'account disabled, please contact admin'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(
    userForToken,
    config.SECRET!,
    { expiresIn: 60*60 }
  )

  await ActiveUserSession.create({
    token,
    userId: user.id,
  })

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

export default loginUserRouter