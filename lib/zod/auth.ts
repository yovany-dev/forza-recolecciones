import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: 'El correo electrónico es obligatorio' })
    .email({ message: 'Correo electrónico no válida' }),
  password: z
    .string()
    .nonempty({ message: 'La contraseña es obligatoria' })
    .min(6, { message: 'Debe tener 6 o más caracteres' })
    .max(20, { message: 'Debe tener 20 o menos caracteres.' }),
});
export type loginSchemaType = z.infer<typeof loginSchema>;

export const loginClockInSchema = z.object({
  identity: z
    .string()
    .nonempty({ message: 'El campo es obligatoria' })
    .min(6, { message: 'Debe tener 6 o más caracteres' })
    .max(13, { message: 'Debe tener 13 o menos caracteres.' }),
});
export type loginClockInSchemaType = z.infer<typeof loginClockInSchema>;
