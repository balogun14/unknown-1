import { eq } from 'drizzle-orm';
import { db } from '../../../db';
import { event } from '../../../db/schema/event';

class EventService {
  async createEvent(data: typeof event.$inferInsert) {
    const [newEvent] = await db.insert(event).values(data).returning();
    return newEvent;
  }

  async getEventById(id: string) {
    const result = await db.select().from(event).where(eq(event.id, id));
    return result[0];
  }

  async getUserEvents(userId: string) {
    return await db.select().from(event).where(eq(event.createdBy, userId));
  }

  async deleteEvent(eventId: string) {
    return await db.delete(event).where(eq(event.id, eventId));
  }
}

export const eventService = new EventService();
