import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  decimal,
  integer,
} from 'drizzle-orm/pg-core';
import { user } from './auth-schema';

export const event = pgTable('events', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  description: text('description'),
  venue: varchar({ length: 255 }).notNull(),
  availableTickets: integer('available_tickets').notNull(),
  startDate: timestamp({ withTimezone: true, mode: 'date' }).notNull(),
  createdBy: text('created_by').references(() => user.id, {
    onDelete: 'cascade',
  }),
  price: decimal().notNull(),
  createdAt: timestamp('created_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp('updated_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});
