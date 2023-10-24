import { Sequelize } from 'sequelize-typescript';

export const sequelize = new Sequelize({
  database: 'mydatabase',
  dialect: 'sqlite',
  storage: ':memory:',
});
