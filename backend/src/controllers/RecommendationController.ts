import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Purchase } from '../entities/Purchase';
import { Product } from '../entities/Product';

export class RecommendationController {
  async getRecommendations(req: Request, res: Response) {
    const { clientId } = req.params;
    
    // Encontrar o tipo de produto mais comprado pelo cliente
    const purchases = await AppDataSource
      .getRepository(Purchase)
      .createQueryBuilder('purchase')
      .leftJoinAndSelect('purchase.product', 'product')
      .where('purchase.client.id = :clientId', { clientId })
      .getMany();

    if (purchases.length === 0) {
      return res.status(404).json({ message: 'No purchases found for this client' });
    }

    const typeCount = new Map<number, number>();
    purchases.forEach(purchase => {
      const count = typeCount.get(purchase.product.type) || 0;
      typeCount.set(purchase.product.type, count + 1);
    });

    const mostBoughtType = Array.from(typeCount.entries())
      .reduce((a, b) => a[1] > b[1] ? a : b)[0];

    // Recomendar produtos do mesmo tipo
    const recommendations = await AppDataSource
      .getRepository(Product)
      .createQueryBuilder('product')
      .where('product.type = :type', { type: mostBoughtType })
      .andWhere('product.status = 1')
      .orderBy('product.value', 'DESC')
      .take(5)
      .getMany();

    return res.json(recommendations);
  }
} 