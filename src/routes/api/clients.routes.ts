import { Router } from 'express';
import {
  createClient,
  getClients,
} from '../../controllers/clients.controllers';

const router = Router();

router.get('/', getClients);

router.post('/create', createClient);

export default router;
