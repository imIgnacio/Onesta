import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Client } from './Client';

@Entity()
export class Farmer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email!: string;

  @Column()
  first_name!: string;

  @Column()
  last_name!: string;

  @OneToMany(() => Client, client => client.farmer)
  clients!: Client[];
}
