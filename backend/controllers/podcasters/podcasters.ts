import { Request, Response } from 'express';
const podcastersRouter = require('express').Router();
import  models  from '../../models';
import tokenExtractor from '../../utils/middleware';
import ActivePodcasterSession from '../../models/active_podcaster_session';
import { sequelize } from '../../utils/db';
import { PodcasterDTO } from '../../dtos/PodcasterDTO';
import { JWTRequest } from '../../dtos/types';

//get all podcasters with info about added podcasts and subscribers
podcastersRouter.get('/', async (_req: Request, res : Response) => {
  const podcasters  = await models.Podcaster.scope('defaultScope').findAll({
    include:[
      {
        model: models.Podcast,
        as: 'podcasts',
        attributes: { exclude: [''] }
      },
      {
        model: models.User,
        as:'subscribers',
        attributes: { exclude: ['verified', 'disabled', 'updatedAt', 'createdAt', 'username'] },
        through: {
          attributes: { exclude: ['podcasterId' , 'userId']}
        } 
      }, 
    ],
  }) ;

  const podcasterDTOs = podcasters.map((podcaster) => new PodcasterDTO(podcaster));   
  res.json(podcasterDTOs);
});

//get single podcaster by id with info about added podcasts and subscribers
podcastersRouter.get('/:id', async (req: Request, res : Response) => {
  const {id} = req.params
  const podcaster  = await models.Podcaster.scope('defaultScope').findByPk( id,{
    include:[
      {
        model: models.Podcast,
        as: 'podcasts',
        attributes: { exclude: [''] }
      },
      {
        model: models.User,
        as:'subscribers',
        attributes: { exclude: ['verified', 'disabled', 'updatedAt', 'createdAt', 'username'] },
        through: {
          attributes: { exclude: ['podcasterId' , 'userId']}
        } 
      }, 
    ],
  });
  if(podcaster) {
    const podcasterDTO = new PodcasterDTO(podcaster);
     
    res.json(podcasterDTO);
  } else {
    res.status(422).json({ message : 'podcaster does not exist'})
  }
});

//create a new podcaster
podcastersRouter.post('/', async (req : Request, res: Response) => {
  const { username, name, password } = req.body;
  const checkExistingPodcaster = await models.Podcaster.findOne({ where: { username}})
  if(checkExistingPodcaster){
    res.json({ message : ' Podcaster with this email already exists'})
  }
  const podcaster = await models.Podcaster.create({
    username: username,
    name: name,
    password: password
  });
  if(podcaster) {
    res.json(podcaster);
  } else {
    res.status(422).json({ message : 'creating podcaster failed, check data sent'})
  }
});


// Update a podcaster's name by podcaster
podcastersRouter.patch('/:id', tokenExtractor, async (req: JWTRequest, res: Response) => {
  const { id } = req.params
  if(req.decodedToken.id === Number(id)){
    const podcastToEdit = await models.Podcaster.findByPk(id);
    if (podcastToEdit) {
       podcastToEdit.name = req.body.name
       podcastToEdit.save()
      res.json(podcastToEdit);
    } else {
      res.status(422).json({ error: 'Podcaster not found' });
    }
  } else {
    res.status(422).json({ message : 'podcaster must be authenticated to perform action'})
  }
});

// verify or disable podcaster by admin or superuser
podcastersRouter.put('/:id', tokenExtractor, async (req: JWTRequest, res: Response) => {
  if(req.decodedToken.role === 'superuser' || req.decodedToken.role === 'admin' ){
    const { id } = req.params
    const { verified , disabled} = req.body
    const podcasterToUpdate = await models.Podcaster.findByPk(id);
    if (podcasterToUpdate) {
      // Fetch the updated podcaster data
      const [updatedPodcaster]= await models.Podcaster.update({
        verified : podcasterToUpdate.verified !== verified ? !verified : verified,
        disabled : podcasterToUpdate.disabled !== disabled ? !disabled : disabled,
      }, { where : {id} , returning: true} )
      res.json(updatedPodcaster);
    } else {
      res.status(422).json({ error: 'Podcaster not found' });
    }
  } else {
    res.status(422).json({ message : 'not enough permissions to perform this action'})
  }
});

// add a podcast to a podcaster
podcastersRouter.post('/:id/podcasts', tokenExtractor, async (req: JWTRequest, res: Response) => {
  const { id } = req.params;
  const podcaster = await models.Podcaster.findByPk( id );
  if (podcaster) {
    const newPodcast = await models.Podcast.create({ ...req.body, podcaster_id: id }) ;
    res.status(201).json(newPodcast);
  } else {
    res.status(422).json({ error: 'Podcaster not found' });
  }
});

// Delete podcaster by id and subsequentely the active session by SUPERUSER
podcastersRouter.delete('/:id', tokenExtractor, async (req: JWTRequest, res: Response) => {
  if( req.decodedToken.role === 'superuser') {
    const podcaster = await models.Podcaster.findOne({ where: { id: req.params.id } });
    if (podcaster) {
      await sequelize.transaction(async (transaction) => {
        await ActivePodcasterSession.destroy({ where: { podcasterId: podcaster.id }, transaction });
        await models.Podcaster.destroy({ where: { id: podcaster.id }, transaction });
      });
      res.status(204).json('podcaster deleted from the database'); 
    } else {
      res.status(422).json({ error: 'Podcaster nor found or failed to be deleted from database' });
    }
   } else {
    res.status(422).json({ message : 'not enough permissions to perform this action'})
   }
});

export default podcastersRouter;