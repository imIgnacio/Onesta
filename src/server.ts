import express from 'express';
import { sequelize } from './config/db';
import router from './routes';
import User from './models/Client';
import Farmer from './models/Farmer';
import Harvest from './models/Harvest';

const app = express();
const port = 3000;

sequelize.addModels([User, Farmer, Harvest]);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
