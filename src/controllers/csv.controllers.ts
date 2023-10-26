import { Request, Response } from 'express';
import csv from 'csv-parser';
import fs from 'node:fs';
import path from 'node:path';
import { Readable } from 'node:stream';
import Farmer from '../models/Farmer';
import Client from '../models/Client';
import Harvest from '../models/Harvest';

export const importCSV = async (req: Request, res: Response) => {
  try {
    const filePath = path.join(__dirname, '..', '..', req.file?.path as string);
    const fileBuffer = fs.readFileSync(filePath);

    const results: any[] = [];

    const readableStream = new Readable();
    readableStream.push(fileBuffer);
    readableStream.push(null);

    readableStream
      .pipe(csv({ separator: ';' }))
      .on('data', data => results.push(data))
      .on('end', async () => {
        // Transform keys of each object in results array to match the column names of models
        const farmersMapped = results.map(result => {
          const {
            'Nombre Agricultor': firstName,
            'Apellido Agricultor': lastName,
            'Mail Agricultor': email,
          } = result;
          return { firstName, lastName, email };
        });

        await Farmer.bulkCreate(farmersMapped, {
          fields: ['email', 'firstName', 'lastName'],
          updateOnDuplicate: ['email'],
        });

        const clientsMapped = results.map(result => {
          const {
            'Nombre Cliente': firstName,
            'Apellido Cliente': lastName,
            'Mail Cliente': email,
          } = result;
          return { firstName, email, lastName };
        });

        await Client.bulkCreate(clientsMapped, {
          fields: ['email', 'firstName', 'lastName'],
          updateOnDuplicate: ['email'],
        });

        const harvestsMapped = results.map(result => {
          const {
            'Nombre Campo': name,
            'Ubicación de Campo': location,
            'Fruta Cosechada': fruit,
            'Variedad Cosechada': size,
          } = result;
          return { fruit, size, name, location };
        });

        await Harvest.bulkCreate(harvestsMapped, {
          fields: ['fruit', 'size', 'name', 'location'],
          updateOnDuplicate: ['fruit', 'size', 'name', 'location'],
        });

        res.status(200).json({ message: 'CSV data imported successfully' });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
