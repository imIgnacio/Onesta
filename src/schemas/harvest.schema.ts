import { z } from 'zod';

export const createHarvestSchema = z.object({
  body: z.object({
    fruit: z.string().min(2).max(64),
    size: z.string().min(2).max(64),
    name: z.string().min(2).max(64),
    location: z.string().min(2).max(256),
  }),
});
