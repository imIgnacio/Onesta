import { Request, Response } from 'express';
import { Client } from '../models/Client';

export const getClients = async (req: Request, res: Response) => {
  try {
    const clients = await Client.findAll(); // Use Sequelize to fetch all users

    res.status(200).json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createClient = async (req: Request, res: Response) => {
  try {
    const client = await Client.create(req.body);

    res.status(201).json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
