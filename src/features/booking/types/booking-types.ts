import { booking } from '../../../db/schema/booking';
import z from 'zod';

export const createBookingSchema = z.object({
  quantity: z.number().nonnegative(),
});

export type CreateBookingDTO = z.infer<typeof createBookingSchema>;
export type BookingInsert = typeof booking.$inferInsert;
