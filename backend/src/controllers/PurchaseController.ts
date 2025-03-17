import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Purchase } from '../entities/Purchase';
import { Client } from '../entities/Client';
import { Product } from '../entities/Product';

export class PurchaseController {
  private repository = AppDataSource.getRepository(Purchase);

  async create(req: Request, res: Response) {
    const { clientId, productId } = req.body;
    
    const client = await AppDataSource.getRepository(Client).findOne({
      where: { id: clientId }
    });
    
    const product = await AppDataSource.getRepository(Product).findOne({
      where: { id: productId }
    });

    if (!client || !product) {
      return res.status(404).json({ message: 'Client or Product not found' });
    }

    const purchase = this.repository.create({
      client,
      product
    });

    await this.repository.save(purchase);
    return res.status(201).json(purchase);
  }

  async findByClient(req: Request, res: Response) {
    const { clientId } = req.params;
    const purchases = await this.repository.find({
      where: { client: { id: parseInt(clientId) } },
      relations: ['product']
    });
    return res.json(purchases);
  }
} 