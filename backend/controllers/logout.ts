const logoutRouter = require('express').Router();
import tokenExtractor  from '../utils/middleware';
import models from '../models';
import { sequelize } from '../utils/db';
import { Response} from 'express';

logoutRouter.post('/', tokenExtractor, async (req: {
    token: string; params: { username: string; }; 
}, res: Response) => {
    
  await sequelize.transaction(async (transaction) => {
    await models.ActiveUserSession.destroy({ where: { token: req.token } , transaction });
    await models.ActivePodcasterSession.destroy({ where: { token: req.token } , transaction });
  });
  res.status(204).end(); 
    
});
  

export default logoutRouter;