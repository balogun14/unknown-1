import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  decimal,
  integer,
} from 'drizzle-orm/pg-core';

import { event } from './event';
import { user } from './auth-schema';

export const booking = pgTable('bookings', {
  id: uuid('id').defaultRandom().primaryKey(),
  eventId: uuid('event_id')
    .notNull()
    .references(() => event.id, { onDelete: 'set null' }),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  totalAmount: integer().notNull(),
  quantity: integer().notNull(),
  createdAt: timestamp('created_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});
