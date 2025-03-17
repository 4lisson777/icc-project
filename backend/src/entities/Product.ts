import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Purchase } from './Purchase';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 30 })
  name!: string;

  @Column()
  type!: number;

  @Column('float')
  value!: number;

  @Column({ length: 100 })
  description!: string;

  @Column()
  status!: number;

  @OneToMany(() => Purchase, purchase => purchase.product)
  purchases!: Purchase[];
} 