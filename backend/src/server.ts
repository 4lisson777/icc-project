import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './data-source';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

AppDataSource.initialize().then(() => {
  console.log('Database connected');
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}).catch((error) => console.log(error)); 