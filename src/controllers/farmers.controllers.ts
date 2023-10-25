import { Request, Response } from 'express';
import { Farmer } from '../models/Farmer';

export const getFarmers = async (req: Request, res: Response) => {
  try {
    const farmers = await Farmer.findAll(); // Use Sequelize to fetch all users

    res.status(200).json(farmers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createFarmer = async (req: Request, res: Response) => {
  try {
    const farmer = await Farmer.create(req.body);

    res.status(201).json(farmer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
