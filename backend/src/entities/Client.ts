import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Purchase } from './Purchase';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 30 })
  name!: string;

  @Column({ length: 100 })
  address!: string;

  @Column()
  status!: number;

  @OneToMany(() => Purchase, purchase => purchase.client)
  purchases!: Purchase[];
} 