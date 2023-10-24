import { Router } from 'express';
import clientRoutes from './clients.routes';
import farmerRoutes from './farmers.routes';

const router = Router();

router.use('/clients', clientRoutes);
router.use('/farmers', farmerRoutes);

export default router;
