import { Router } from 'express';
import authRoutes from '../features/auth/components/auth-routes';
import eventManagementRoutes from '../features/event-management/components/event-routes';
import bookingRoutes from '../features/booking/components/booking-routes';
const router: Router = Router();

router.use('/auth', authRoutes);
router.use('/', eventManagementRoutes);
router.use('/', bookingRoutes);
export default router;
