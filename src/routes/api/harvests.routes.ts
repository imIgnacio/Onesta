import { Router } from 'express';
import {
  getHarvests,
  createHarvest,
} from '../../controllers/harvests.controllers';
import { schemaValidator } from '../../middlewares/schemaValidator';
import { createHarvestSchema } from '../../schemas/harvest.schema';

const router = Router();

router.get('/', getHarvests);

router.post('/create', schemaValidator(createHarvestSchema), createHarvest);

export default router;
