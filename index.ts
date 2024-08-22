import express, { Express } from "express";
import dotenv from "dotenv";
dotenv.config();
import  Podcast from "./models/podcast";
const app: Express = express();
const port = process.env.PORT || 3000;


const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL)

const main = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')

    await sequelize.sync(); 
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

main()

app.get('/api/podcasts/:id', async (req,res)=> {
  const podcast = await Podcast.findByPk(req.params.id);
  console.log(podcast)
  if(podcast) {
    res.json(podcast);
  } else {
    res.status(404).end();
  }
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
