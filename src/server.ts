import express from 'express';
import { sequelize } from './config/db';
import User from './models/Client';
import router from './routes';

const app = express();
const port = 3000;

sequelize.addModels([User]);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
