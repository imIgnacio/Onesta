import { Request, Response } from 'express';
import fs from 'node:fs';
import path from 'node:path';
import csv from 'csv-parser';
import { Readable } from 'node:stream';
import Farmer from '../models/Farmer';
import Client from '../models/Client';
import Harvest from '../models/Harvest';

export const importCSV = async (req: Request, res: Response) => {
  try {
    const filePath = path.join(__dirname, '..', '..', req.file?.path as string);
    const fileBuffer = fs.readFileSync(filePath);

    console.log('fileBuffer', fileBuffer);
    const results: any[] = [];

    const readableStream = new Readable();
    readableStream.push(fileBuffer);
    readableStream.push(null);

    readableStream
      .pipe(csv())
      .on('data', data => results.push(data))
      .on('end', () => {
        results.forEach(async row => {
          console.log('row', row);
          try {
            const farmer = await Farmer.create({
              email: row['Mail Agricultor'],
              firstName: row['Nombre Agricultor'],
              lastName: row['Apellido Agricultor'],
            });

            const client = await Client.create({
              email: row['Mail Cliente'],
              firstName: row['Nombre Cliente'],
              lastName: row['Apellido Cliente'],
            });

            // eslint-disable-next-line no-unused-vars
            const harvest = await Harvest.create({
              farmerId: farmer.id,
              clientId: client.id,
              fieldName: row['Nombre Campo'],
              location: row['Ubicación de Campo'],
              harvestedFruit: row['Fruta Cosechada'],
              harvestSize: row['Tamaño Cosecha'],
            });

            // await farmer.addClient(client);
            // await client.addFarmer(farmer);

            // await farmer.addHarvest(harvest);
            // await harvest.addClient(farmer);
          } catch (error) {
            console.error('Error processing CSV row:', error);
          }
        });

        res.status(200).json({ message: 'CSV data imported successfully' });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
