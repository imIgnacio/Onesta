import {
  Model,
  Column,
  Table,
  PrimaryKey,
  AutoIncrement,
  DataType,
  HasMany,
  Unique,
} from 'sequelize-typescript';
import Client from './Client';
import Harvest from './Harvest';

@Table
export class Farmer extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id?: number;

  @Column(DataType.STRING)
  firstName?: string;

  @Column(DataType.STRING)
  lastName?: string;

  @Unique
  @Column(DataType.STRING)
  email?: string;

  @HasMany(() => Client)
  clients?: Client[];

  @HasMany(() => Harvest)
  harvests?: Harvest[];
}

export default Farmer;
