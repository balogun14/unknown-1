import { event } from '../../../db/schema/event';

// export interface CreateEventDto {
//   name: string;
//   venue: string;
//   description: string;
//   startDate: Date;
//   price: number;
// }

export type CreateEventDto = Omit<
  typeof event.$inferInsert,
  'id' | 'createdAt' | 'updatedAt' | 'createdBy'
>;
