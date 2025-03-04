import { z } from 'zod';

export const driverSchema = z.object({
  uuid: z.string().uuid().optional(),
  employeeNumber: z
    .string()
    .nonempty({ message: 'El número de gafete es obligatorio' })
    .regex(/^\d+$/, { message: 'El campo solo admite números' }),
  fullname: z
    .string()
    .nonempty({ message: 'El nombre es obligatorio.' })
    .min(6, { message: 'Debe tener 6 o más caracteres.' })
    .max(64, { message: 'Debe tener 64 o menos caracteres.' }),
  dpi: z
    .string()
    .nonempty({ message: 'El número de DPI es obligatorio' })
    .regex(/^\d+$/, { message: 'El campo solo admite números' }),
  schedule: z.string().nonempty({ message: 'El horario es obligatorio.' }),
  position: z.string().nonempty({ message: 'El cargo es obligatorio.' }),
  createdAt: z.string().datetime().optional(),
  user: z.unknown().optional(),
  userId: z.number().int().positive().optional(),
});

export type driverSchemaType = z.infer<typeof driverSchema>;
