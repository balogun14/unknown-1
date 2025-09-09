import { NextFunction, Request, Response } from 'express';
import {
  BadRequest,
  InvalidInput,
  ResourceNotFound,
  Unauthorized,
} from '../../../middlewares/error-middleware';
import { bookingService } from '../services/booking-service';
import z from 'zod';
import {
  BookingInsert,
  CreateBookingDTO,
  createBookingSchema,
} from '../types/booking-types';
import { eventService } from '../../event-management/services/event-service';
import { paymentservice } from '../../payment/services/payment-service';

export async function createBooking(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { eventId } = req.params;
  const userId = req.user.id;
  const bookingReq: CreateBookingDTO = req.body.booking;
  try {
    const result = createBookingSchema.safeParse(bookingReq);
    if (!result.success) {
      throw new InvalidInput('Invalid booking data');
    }

    const event = await eventService.getEventById(eventId!);
    if (!event) {
      throw new ResourceNotFound(`Event with ID ${eventId} not found`);
    }
    const bookingData: BookingInsert = {
      quantity: bookingReq.quantity,
      userId,
      eventId: eventId!,
      totalAmount: bookingReq.quantity * Number(event.price),
    };

    if (event.availableTickets - bookingData.quantity < 0) {
      throw new BadRequest('There are not enough tickets');
    }
    const paymentResult = await paymentservice.createPayment(
      bookingData.totalAmount,
      req.user.email,
      'naira'
    );

    if (paymentResult.status !== 'success') {
      throw new BadRequest('Payment failed. Please try again');
    }

    const tickets = await bookingService.createBooking(bookingData);

    res.status(200).json({
      success: true,
      data: tickets,
      message: 'successfully booked event',
    });
  } catch (error) {
    next(error);
  }
}

export async function getBookingById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { bookingId } = req.params;
  try {
    const result = z.uuid().safeParse(bookingId);

    if (!result.success) {
      throw new BadRequest('Booking ID should be a valid uuid string');
    }
    const booking = await bookingService.getBookingById(bookingId!);
    if (!booking) {
      throw new ResourceNotFound('Booking not found');
    }
    res.status(200).json({
      success: true,
      data: booking,
      message: 'Booking fetched successfully',
    });
  } catch (error) {
    next(error);
  }
}

export async function getUserBookings(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = req.params;
    const user = req.user;

    if (user.id !== userId) {
      throw new Unauthorized('You cannot check another users records');
    }
    const bookings = bookingService.getUserBookings(userId);
    res.status(200).json({
      success: true,
      data: bookings,
      message: 'Bookings fetched successfully',
    });
  } catch (error) {
    next(error);
  }
}
