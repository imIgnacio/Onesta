import {
  Model,
  Column,
  Table,
  PrimaryKey,
  AutoIncrement,
  DataType,
  Unique,
} from 'sequelize-typescript';

@Table
export class Farmer extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.STRING)
  firstName: string;

  @Column(DataType.STRING)
  lastName: string;

  @Unique
  @Column(DataType.STRING)
  email: string;

  static async createSafe(data: any) {
    try {
      return await Farmer.create(data);
    } catch (error) {
      console.error('Error creating farmer:', error);
    }
  }
}

export default Farmer;
