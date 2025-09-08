import z from 'zod';
import { event } from '../../../db/schema/event';

export const createEventSchema = z.object({
  name: z.string().min(6).trim(),
  venue: z.string().min(6),
  description: z.string().min(1).trim(),
  startDate: z.iso.datetime(),
  price: z.number().nonnegative(),
});
export const updateEventSchema = createEventSchema;

export type CreateEventDto = Omit<
  typeof event.$inferInsert,
  'id' | 'createdAt' | 'updatedAt' | 'createdBy'
>;

export type UpdateEventDto = CreateEventDto;
