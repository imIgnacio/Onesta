import { Router } from 'express';
import {
  createFarmer,
  getFarmers,
} from '../../controllers/farmers.controllers';

const router = Router();

router.get('/', getFarmers);

router.post('/create', createFarmer);

export default router;
