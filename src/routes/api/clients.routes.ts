import { Router } from 'express';
import {
  createClient,
  getClients,
} from '../../controllers/clients.controllers';
import { schemaValidator } from '../../middlewares/schemaValidator';
import { createClientSchema } from '../../schemas/client.schema';

const router = Router();

router.get('/', getClients);

router.post('/create', schemaValidator(createClientSchema), createClient);

export default router;
