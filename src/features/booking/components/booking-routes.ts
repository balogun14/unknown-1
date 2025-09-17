import { Router } from 'express';
import { requireAuth } from '../../../middlewares/auth-middleware';
import { createBooking, getUserBookings } from './booking-controller';

const router: Router = Router();

/**
 * @swagger
 * /api/bookings/{bookingId}:
 *   get:
 *     summary: Get a booking by its ID
 *     tags:
 *       - Bookings
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         schema:
 *           type: string
 *         description: The booking ID
 *     responses:
 *       200:
 *         description: Booking details
 *       404:
 *         description: Booking not found
 */
// router.get('/bookings/:bookingId', requireAuth);

/**
 * @swagger
 * /api/events/{eventId}/bookings:
 *   post:
 *     summary: Create a booking for an event
 *     tags:
 *       - Bookings
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *         description: The event ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBookingDto'
 *     responses:
 *       200:
 *         description: A list of created tickets
 *       400:
 *         description: Invalid input
 */
router.post('/events/:eventId/bookings', requireAuth, createBooking);

/**
 * @swagger
 * /api/users/{userId}/bookings:
 *   get:
 *     summary: Get all bookings made by a user
 *     tags:
 *       - Bookings
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A list of bookings created by the user
 */
router.get('/users/:userId/bookings', requireAuth, getUserBookings);

export default router;
