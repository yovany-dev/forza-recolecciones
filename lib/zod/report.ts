import { z } from 'zod';
import { employeeSchema } from '@/lib/zod/employee';

export const reportSchema = employeeSchema.extend({
  checkIn: z
    .string()
    .nonempty({ message: 'La hora de entrada es obligatorio.' }),
  location: z.enum(['ADMIN', 'DETECTADA', 'NO_DETECTADA']),
  photo: z.enum(['ADMIN', 'CARGADA', 'NO_CARGADA']),
  state: z.enum(['ADMIN', 'INGRESADO', 'PENDIENTE', 'INGRESO_TARDE']),
});

export type reportSchemaType = z.infer<typeof reportSchema>;
