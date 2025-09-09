import { pgTable, uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core';
import { event } from './event';
import { user } from './auth-schema';
import { booking } from './booking';

export const ticket = pgTable('tickets', {
  id: uuid('id').defaultRandom().primaryKey(),
  eventId: uuid('event_id')
    .notNull()
    .references(() => event.id, { onDelete: 'no action' }),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'no action' }),
  bookingId: uuid('booking_id')
    .notNull()
    .references(() => booking.id, { onDelete: 'cascade' }),
});
