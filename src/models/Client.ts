import {
  Model,
  Column,
  Table,
  PrimaryKey,
  AutoIncrement,
  DataType,
  BelongsTo,
  ForeignKey,
  Unique,
} from 'sequelize-typescript';
import Farmer from './Farmer';

@Table
export class Client extends Model {
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

  // Define the foreign key column
  @ForeignKey(() => Farmer)
  @Column(DataType.INTEGER)
  farmerId?: number;

  // Create a relationship with the Farmer model
  @BelongsTo(() => Farmer)
  farmer?: Farmer;
}

export default Client;
