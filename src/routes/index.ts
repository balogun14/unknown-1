import { Router } from 'express';
import authRoutes from '../features/auth/components/auth-routes';
import eventManagementRoutes from '../features/event-management/components/event-routes';

const router: Router = Router();

router.use('/auth', authRoutes);
router.use('/', eventManagementRoutes);

export default router;
