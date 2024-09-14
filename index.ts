import express, { Express } from "express";
import dotenv from "dotenv";
dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000;
const { connectToDatabase } = require('./util/db')


app.use(express.json());


const start = async () => {
  await connectToDatabase()
  app.listen( port, () => {
    console.log(`Server running on port ${port}`)
  })
}

start()
