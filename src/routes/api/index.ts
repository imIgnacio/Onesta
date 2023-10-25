import { Router } from 'express';
import clientRoutes from './clients.routes';
import farmerRoutes from './farmers.routes';
import uploadsRoutes from './uploads.routes';

const router = Router();

router.use('/clients', clientRoutes);
router.use('/farmers', farmerRoutes);
router.use('/uploads', uploadsRoutes);

export default router;
