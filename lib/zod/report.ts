import { z } from 'zod';
import { employeeSchema } from '@/lib/zod/employee';
import { EmployeeType } from '@/types/employeeType';

const employeeType: Record<EmployeeType, EmployeeType> = {
  driver: 'driver',
  copilot: 'copilot',
};

export const reportStateSchema = z.object({
  checkIn: z
    .string()
    .nonempty({ message: 'La hora de entrada es obligatorio.' })
    .optional(),
  location: z.enum(['ADMIN', 'DETECTADA', 'NO_DETECTADA']),
  photo: z.enum(['ADMIN', 'CARGADA', 'NO_CARGADA']),
  state: z.enum(['ADMIN', 'INGRESADO', 'PENDIENTE', 'INGRESO_TARDE']),
});
export type reportStateSchemaType = z.infer<typeof reportStateSchema>;

export const reportSchema = employeeSchema.merge(reportStateSchema);
export type reportSchemaType = z.infer<typeof reportSchema>;

export const createReportSchema = reportStateSchema.extend({
  dpi: z
    .string()
    .min(1, { message: 'El número de DPI es obligatorio.' })
    .max(13, {
      message: 'El número de DPI no puede tener más de 13 números.',
    }),
  type: z.enum([employeeType.driver, employeeType.copilot]),
});
export type createReportSchemaType = z.infer<typeof createReportSchema>;

export const updateReportSchema = createReportSchema.extend({
  uuid: z
    .string()
    .uuid()
    .nonempty({ message: 'El uuid del report es obligatorio.' }),
});
export type updateReportSchemaType = z.infer<typeof updateReportSchema>;
