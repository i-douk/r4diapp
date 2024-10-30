import jwt from 'jsonwebtoken';
import { Router } from 'express';
import config from '../../utils/config';
import User from '../../models/user';
import ActiveUserSession from '../../models/active_user_session';
import bcrypt from 'bcrypt';

const loginUserRouter = Router();

loginUserRouter.post('/', async (request, response) => {
  const { username, password } = request.body;

    // Find the user by username
    const user : any = await User.findOne({
      where: { username: username }
    });

    // Check if user exists
    if (!user) {
      return response.status(401).json({
        error: 'invalid username or password'
      });
    }
    // Compare the plaintext password with the hashed password
    const passwordCorrect = await bcrypt.compare(password, user.password);

    // Check if password is correct
    if (!passwordCorrect) {
      return response.status(401).json({
        error: 'invalid username or password'
      });
    }

    // Check if the account is disabled
    if (user.disabled) {
      return response.status(401).json({
        error: 'account disabled, please contact admin'
      });
    }

    // Create token payload
    const userForToken = {
      username: user.username,
      id: user.id,
      role:user.role
    };

    // Sign the token
    const token = jwt.sign(userForToken, config.SECRET!, { expiresIn: '1h' });

    // Create an active user session
    await ActiveUserSession.create({
      token,
      userId: user.id,
      role: user.role
    });

    // Respond with token and user information
    return response.status(200).send({ token, username: user.username, name: user.name , role: user.role});


});

export default loginUserRouter;
