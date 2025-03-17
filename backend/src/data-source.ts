import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Product } from './entities/Product';
import { Client } from './entities/Client';
import { Purchase } from './entities/Purchase';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'geek_center',
  synchronize: true,
  logging: true,
  entities: [Product, Client, Purchase],
  subscribers: [],
  migrations: [],
}); 