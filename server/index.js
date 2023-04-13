import 'dotenv/config.js'
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';

const app = express();

app.use('/posts', postRoutes)

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());


mongoose.connect(process.env.DATABASE_URL)
.then(() => {
  // listen for requests
  app.listen(process.env.PORT, () => {
  console.log('listening to port', process.env.PORT);
  })
})
.catch((error) => {
  console.log(error)
})


