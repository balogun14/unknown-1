import { Router } from 'express';
import authRoutes from '../features/auth/components/auth-routes';
import eventRoutes from '../features/event-management/components/event-routes';

const router: Router = Router();
router.use('/auth', authRoutes);
router.use('/', eventRoutes);

export default router;
