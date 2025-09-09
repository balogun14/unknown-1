import { event } from '../../../db/schema/event';
import { db } from '../../../db';
import { NextFunction, Request, Response } from 'express';
import { eventService } from '../services/event-service';
import {
  BadRequest,
  HttpError,
  InvalidInput,
  ResourceNotFound,
  ServerError,
} from '../../../middlewares/error-middleware';
import {
  CreateEventDto,
  createEventSchema,
  UpdateEventDto,
  updateEventSchema,
} from '../types/event-types';

export async function getAllEvents(
  req: Request,
  res: Response,
  next: NextFunction
) {
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
    next(new ServerError('Internal Server Error'));
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
  }
}

export async function createEvent(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const eventReq: CreateEventDto = req.body.event;
    console.log(eventReq);
    const result = createEventSchema.safeParse(eventReq);

    if (!result.success) {
      throw new InvalidInput('Invalid Input');
    }

    const newEvent = await eventService.createEvent(eventReq);
    if (newEvent) {
      res.status(200).json({
        success: true,
        message: 'Event created successfully',
        data: newEvent,
      });
    }
  } catch (error) {
    next(error);
  }
}

export async function updateEvent(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { eventId } = req.params;
  try {
    const eventReq: UpdateEventDto = req.body.event;
    const result = updateEventSchema.safeParse(eventReq);
    if (!result.success) {
      throw new InvalidInput('Invalid input');
    }
    const existingEvent = await eventService.getEventById(eventId!);

    if (!existingEvent) {
      throw new ResourceNotFound(`Event with id ${eventId} not found`);
    }

    const updatedEvent = await eventService.updateEvent(eventId!, eventReq);

    if (!updatedEvent) {
      throw new ServerError('Somthing went wrong');
    }
    res.status(200).json({
      success: true,
      message: 'Event updated successfully',
      data: updatedEvent,
    });
  } catch (error) {
    if (error instanceof InvalidInput) {
      res.json({ error: error.cause });
    } else {
      next(error);
    }
  }
}
export async function getUserEvents(
  req: Request,
  res: Response,
  next: NextFunction
) {
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
