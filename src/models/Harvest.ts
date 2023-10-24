import {
  Model,
  Column,
  Table,
  PrimaryKey,
  AutoIncrement,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import Farmer from './Farmer';

@Table
export class Harvest extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id?: number;

  @Column(DataType.STRING)
  fruit?: string;

  @Column(DataType.STRING)
  size?: string;

  // Define the foreign key column
  @ForeignKey(() => Farmer)
  @Column(DataType.INTEGER)
  farmerId?: number;

  @BelongsTo(() => Farmer)
  farmers?: Farmer;
}

export default Harvest;
