import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Farmer } from './Farmer';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Farmer, farmer => farmer.clients)
  farmer!: Farmer;

  @Column()
  email!: string;

  @Column()
  first_name!: string;

  @Column()
  last_name!: string;
}
