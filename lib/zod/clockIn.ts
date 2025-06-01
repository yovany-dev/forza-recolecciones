import { z } from 'zod';
import { reportStateSchema } from '@/lib/zod/report';

export const uuidSchema = z.string().uuid();

export const stateEnum = reportStateSchema.shape.state;
export type stateEnumType = z.infer<typeof stateEnum>;

export const clockInSchema = z.object({
  uuid: z.string().uuid().optional(),
  employeeUUID: z.string().uuid(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  photoURL: z.string().optional(),
});
export type clockInSchemaType = z.infer<typeof clockInSchema>
