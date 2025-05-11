import { z } from 'zod';

export const employeeSchema = z.object({
  uuid: z.string().uuid().optional(),
  employeeNumber: z
    .string()
    .min(1, { message: 'El número de gafete es obligatorio.' })
    .max(6, {
      message: 'El número de gafete no puede tener más de 6 números.',
    })
    .regex(/^\d+$/, { message: 'El campo debe ser un valor numérico.' }),
  fullname: z
    .string()
    .nonempty({ message: 'El nombre es obligatorio.' })
    .min(6, { message: 'Debe tener 6 o más caracteres.' })
    .max(64, { message: 'Debe tener 64 o menos caracteres.' }),
  dpi: z
  .string()
  .min(1, { message: 'El número de DPI es obligatorio.' })
  .max(13, {
    message: 'El número de DPI no puede tener más de 13 números.',
  })
  .regex(/^\d+$/, { message: 'El campo debe ser un valor numérico'}),
  schedule: z.string().nonempty({ message: 'El horario es obligatorio.' }),
  position: z.string().nonempty({ message: 'El cargo es obligatorio.' }),
  createdAt: z.date().optional(),
  user: z.unknown().optional(),
  userId: z.number().int().positive().optional(),
});

export type employeeSchemaType = z.infer<typeof employeeSchema>;
