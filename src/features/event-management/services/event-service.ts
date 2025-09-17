import { eq } from 'drizzle-orm';
import { db } from '../../../db';
import { event } from '../../../db/schema/event';
import { ResourceNotFound } from '../../../middlewares/error-middleware';

class EventService {
  async createEvent(data: typeof event.$inferInsert) {
    data.startDate = new Date(data.startDate);
    const [newEvent] = await db.insert(event).values(data).returning();
    return newEvent;
  }

  async getEventById(id: string) {
    const [result] = await db.select().from(event).where(eq(event.id, id));
    if (!result) {
      throw new ResourceNotFound(`Event with ID ${id} not found`);
    }
    return result;
  }

  async getUserEvents(userId: string) {
    return await db.select().from(event).where(eq(event.createdBy, userId));
  }

  async deleteEvent(eventId: string) {
    const [deleted] = await db
      .delete(event)
      .where(eq(event.id, eventId))
      .returning();

    if (!deleted) {
      throw new ResourceNotFound(`Event with ID ${eventId} not found`);
    }
    return deleted;
  }

  async updateEvent(id: string, data: typeof event.$inferInsert) {
    data.startDate = new Date(data.startDate);
    const [result] = await db
      .update(event)
      .set(data)
      .where(eq(event.id, id))
      .returning();
    if (!result) {
      throw new ResourceNotFound(`Event with ID ${id} not found`);
    }
    return result;
  }
}

export const eventService = new EventService();
