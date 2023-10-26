import { z } from 'zod';

export const createClientSchema = z.object({
  body: z.object({
    firstName: z.string().min(2).max(64),
    lastName: z.string().min(2).max(64),
    email: z.string().email(),
  }),
});
