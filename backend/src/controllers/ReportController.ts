import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Purchase } from '../entities/Purchase';

export class ReportController {
  async productsByPurchases(req: Request, res: Response) {
    const products = await AppDataSource
      .getRepository(Purchase)
      .createQueryBuilder('purchase')
      .leftJoinAndSelect('purchase.product', 'product')
      .select('product.id', 'id')
      .addSelect('product.name', 'name')
      .addSelect('COUNT(purchase.id)', 'total_purchases')
      .groupBy('product.id')
      .orderBy('total_purchases', 'DESC')
      .getRawMany();

    return res.json(products);
  }

  async clientsByPurchases(req: Request, res: Response) {
    const clients = await AppDataSource
      .getRepository(Purchase)
      .createQueryBuilder('purchase')
      .leftJoinAndSelect('purchase.client', 'client')
      .select('client.id', 'id')
      .addSelect('client.name', 'name')
      .addSelect('COUNT(purchase.id)', 'total_purchases')
      .groupBy('client.id')
      .orderBy('total_purchases', 'DESC')
      .getRawMany();

    return res.json(clients);
  }

  async totalSales(req: Request, res: Response) {
    const total = await AppDataSource
      .getRepository(Purchase)
      .createQueryBuilder('purchase')
      .leftJoinAndSelect('purchase.product', 'product')
      .select('SUM(product.value)', 'total_value')
      .getRawOne();

    return res.json(total);
  }
} 