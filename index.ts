import express from 'express'
const app = express()
require('express-async-errors')
import config from './util/config'
import { connectToDatabase, sequelize } from './util/db'
app.use(express.json())


// Sync Sequelize models with the database
sequelize.sync({ force: false }) 
  .then(() => {
    console.log('Database synchronized');
    app.listen(config.PORT!, async () => {
      await connectToDatabase()
      console.log(`Server running on port ${config.PORT!}`);
    });
  })
  .catch((error: Error) => {
    console.error('Unable to sync database:', error);
  });