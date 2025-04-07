import { z } from 'zod';
import { driverSchema } from '@/lib/zod/driver';

export const reportSchema = driverSchema.extend({
  checkIn: z.string(),
  location: z.string(),
  photo: z.string(),
  state: z.string(),
});

export type reportSchemaType = z.infer<typeof reportSchema>;
