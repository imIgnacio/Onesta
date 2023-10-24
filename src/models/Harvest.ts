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
  BeforeValidate,
} from 'sequelize-typescript';
import Farmer from './Farmer';

@Table
export class Harvest extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id?: number;

  @Unique
  @Column(DataType.STRING)
  fruit?: string;

  @Column(DataType.STRING)
  size?: string;

  @Column(DataType.STRING)
  name?: string;

  @Column(DataType.STRING)
  location?: string;

  @Column(DataType.VIRTUAL)
  get nameLocation(): string {
    return `${this.name} ${this.location}`;
  }

  @Column(DataType.VIRTUAL)
  get fruitSize(): string {
    return `${this.fruit} ${this.size}`;
  }

  @BeforeValidate
  static checkUniqueNameLocation(instance: Harvest) {
    return Harvest.findOne({
      where: {
        nameLocation: instance.nameLocation,
      },
    }).then(existingHarvest => {
      if (existingHarvest && existingHarvest.id !== instance.id) {
        throw new Error('The combination of name and location must be unique.');
      }
    });
  }

  @BeforeValidate
  static checkUniqueFruitSize(instance: Harvest) {
    return Harvest.findOne({
      where: {
        fruitSize: instance.fruitSize,
      },
    }).then(existingHarvest => {
      if (existingHarvest && existingHarvest.id !== instance.id) {
        throw new Error('The combination of fruit and size must be unique.');
      }
    });
  }

  // Define the foreign key column
  @ForeignKey(() => Farmer)
  @Column(DataType.INTEGER)
  farmerId?: number;

  @BelongsTo(() => Farmer)
  farmers?: Farmer;
}

export default Harvest;
