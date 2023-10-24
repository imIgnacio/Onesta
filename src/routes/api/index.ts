import { Router } from 'express';
import clientRoutes from './clients.routes';

const router = Router();

router.use('/clients', clientRoutes);

export default router;
