import { event } from '../../../db/schema/event';
import { db } from '../../../db';
import { NextFunction, Request, Response } from 'express';
import { eventService } from '../services/event-service';
import {
  HttpError,
  ResourceNotFound,
} from '../../../middlewares/error-middleware';
import { CreateEventDto } from '../types/event-types';

export async function getAllEvents(req: Request, res: Response) {
  try {
    const allEvents = await db
      .select({
        id: event.id,
        name: event.name,
        venue: event.venue,
        description: event.description,
        startDate: event.startDate,
        price: event.price,
      })
      .from(event);

    res.status(200).json({
      success: true,
      data: allEvents,
      message: 'Events fetched successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get events',
    });
  }
}

export async function getEventById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { eventId } = req.params;

    const result = await eventService.getEventById(eventId!);
    if (!result) {
      throw new ResourceNotFound('Event not found');
    }

    res.status(200).json({
      success: true,
      data: result,
      message: 'Event fetched successfully',
    });
  } catch (error) {
    next(error);

    // if (error instanceof HttpError) {
    //   res.status(error.statusCode).json({
    //     success: false,
    //     message: error.message,
    //   });
    // } else {
    //   res.status(500).json({ success: false, message: 'Some error occurred' });
    // }
  }
}

export async function createEvent(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const eventReq: CreateEventDto = req.body.event;
    eventReq.startDate = new Date(eventReq.startDate);

    const newEvent = await eventService.createEvent(eventReq);
    if (newEvent) {
      res.status(200).json({
        success: true,
        message: 'Event created successfully',
        data: newEvent,
      });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
}

export async function getUserEvents(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    if (userId) {
      const userEvents = await eventService.getUserEvents(userId);
      res.status(200).json({
        success: true,
        message: 'Events fetched successfully',
        data: userEvents,
      });
    }
  } catch (error) {}
}
