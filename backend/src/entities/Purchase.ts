import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Client } from './Client';
import { Product } from './Product';

@Entity('purchases')
export class Purchase {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Client, client => client.purchases)
  @JoinColumn({ name: 'client_id' })
  client!: Client;

  @ManyToOne(() => Product, product => product.purchases)
  @JoinColumn({ name: 'product_id' })
  product!: Product;
} 