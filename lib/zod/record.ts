import { string, z } from 'zod';

export const rangeSchema = z.object({
  from: string().datetime(),
  to: string().datetime(),
});
export const daySchema = z.string().datetime();
