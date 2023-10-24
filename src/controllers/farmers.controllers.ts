import { Request, Response } from 'express';
import { Farmer } from '../models/Farmer';
import { Harvest } from '../models/Harvest';

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
    const { firstName, lastName, email, harvests } = req.body;

    const farmer = await Farmer.create({
      firstName,
      lastName,
      email,
      harvests,
    });

    harvests.forEach(async (harvest: Harvest) => {
      await Harvest.create({ ...harvest, farmerId: farmer.id });
    });

    res.status(201).json(farmer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
