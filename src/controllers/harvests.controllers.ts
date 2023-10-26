import { Request, Response } from 'express';
import Harvest from '../models/Harvest';

export const getHarvests = async (req: Request, res: Response) => {
  try {
    const harvests = await Harvest.findAll();
    res.status(200).json(harvests);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createHarvest = async (req: Request, res: Response) => {
  try {
    const harvest = await Harvest.create(req.body);
    res.status(201).json(harvest);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
