import { db } from '../../../db';
import { booking } from '../../../db/schema/booking';
import { eq, sql } from 'drizzle-orm';
import { BookingInsert } from '../types/booking-types';
import { event } from '../../../db/schema/event';
import { ticket } from '../../../db/schema/ticket';
class BookingService {
  async createBooking(data: BookingInsert) {
    await db
      .update(event)
      .set({
        availableTickets: sql`${event.availableTickets} - ${data.quantity}`,
      })
      .where(eq(event.id, data.eventId));

    const [result] = await db.insert(booking).values(data).returning();
    if (result) {
      const newTicketsData = Array.from({ length: data.quantity }, () => ({
        userId: data.userId,
        eventId: data.eventId,
        bookingId: result.id,
      }));

      const tickets = await db
        .insert(ticket)
        .values(newTicketsData)
        .returning();

      return tickets;
    }
  }

  async getBookingById(bookingId: string) {
    const result = await db
      .select()
      .from(booking)
      .where(eq(booking.id, bookingId));
    return result[0];
  }

  async getUserBookings(userId: string) {
    return await db.select().from(booking).where(eq(booking.userId, userId));
  }
}

export const bookingService = new BookingService();
