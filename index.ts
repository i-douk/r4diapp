import express, { Express } from "express";
import dotenv from "dotenv";
dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000;
const { connectToDatabase } = require('./util/db')
import { podcastsRouter } from './controllers/podcasts';
import { podcastersRouter } from './controllers/podcasters';

app.use(express.json());
app.use('/api/podcasts', podcastsRouter);
app.use('/api/podcasters', podcastersRouter);

const start = async () => {
  await connectToDatabase()
  app.listen( port, () => {
    console.log(`Server running on port ${port}`)
  })
}

start()