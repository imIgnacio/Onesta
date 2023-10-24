import { Router } from 'express';
import { getClients } from '../../controllers/clients.controllers';

const router = Router();

router.get('/', getClients);

export default router;
