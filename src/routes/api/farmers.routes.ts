import { Router } from 'express';
import {
  createFarmer,
  getFarmers,
} from '../../controllers/farmers.controllers';
import { schemaValidator } from '../../middlewares/schemaValidator';
import { createFarmerSchema } from '../../schemas/farmer.schema';

const router = Router();

router.get('/', getFarmers);

router.post('/create', schemaValidator(createFarmerSchema), createFarmer);

export default router;
