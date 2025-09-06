import { Router } from 'express';
import {
  createEvent,
  getAllEvents,
  getEventById,
  getUserEvents,
} from './event-controller';
import { requireAuth } from '../../../middlewares/auth-middleware';

const router: Router = Router();

router.get('/events', getAllEvents);
router.post('/events', requireAuth, createEvent);
router.get('/events/:eventId', getEventById);
router.put('/events/:eventId', requireAuth);

router.get('/users/:userId/events', getUserEvents);
export default router;
