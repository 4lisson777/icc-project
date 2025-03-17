import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Product } from '../entities/Product';

export class ProductController {
  private repository = AppDataSource.getRepository(Product);

  async create(req: Request, res: Response) {
    const { name, type, value, description } = req.body;
    
    const product = this.repository.create({
      name,
      type,
      value,
      description,
      status: 1
    });

    await this.repository.save(product);
    return res.status(201).json(product);
  }

  async findAll(req: Request, res: Response) {
    const products = await this.repository.find({
      where: { status: 1 }
    });
    return res.json(products);
  }

  async findOne(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const product = await this.repository.findOne({
      where: { id, status: 1 }
    });
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    return res.json(product);
  }

  async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const product = await this.repository.findOne({
      where: { id }
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.status = 0;
    await this.repository.save(product);
    return res.status(204).send();
  }
} 