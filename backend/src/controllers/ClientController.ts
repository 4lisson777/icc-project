import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Client } from '../entities/Client';

export class ClientController {
  private repository = AppDataSource.getRepository(Client);

  async create(req: Request, res: Response) {
    const { name, address } = req.body;
    
    const client = this.repository.create({
      name,
      address,
      status: 1
    });

    await this.repository.save(client);
    return res.status(201).json(client);
  }

  async findAll(req: Request, res: Response) {
    const clients = await this.repository.find({
      where: { status: 1 }
    });
    return res.json(clients);
  }

  async findOne(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const client = await this.repository.findOne({
      where: { id, status: 1 }
    });
    
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    
    return res.json(client);
  }

  async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const client = await this.repository.findOne({
      where: { id }
    });

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    client.status = 0;
    await this.repository.save(client);
    return res.status(204).send();
  }
} 