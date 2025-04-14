import { authOptions } from '../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { reportSchema } from '@/lib/zod/report';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const body = await req.json();
  const prisma = new PrismaClient();
  const { success, error, data } = reportSchema.safeParse(body);

  if (!session || !session.user) {
    return Response.json({ errorMessage: 'unauthorized', status: 401 });
  }
  if (!success) {
    return Response.json({ errors: error.flatten(), status: 400 });
  }

  try {
    const user = await prisma.users.findUnique({
      where: { email: session.user.email },
    });
    const report = await prisma.report.findFirst({
      where: { dpi: data.dpi },
    });

    if (!user) {
      return Response.json({ errorMessage: 'user not found', status: 404 });
    }
    if (report) {
      return Response.json({
        errorMessage: 'El reporte ya existe en la tabla.',
        status: 409,
      });
    }
    const newReport = await prisma.report.create({
      data: {
        employeeNumber: data.employeeNumber,
        fullname: data.fullname,
        dpi: data.dpi,
        position: data.position,
        schedule: data.schedule,
        userId: user.id,
        checkIn: data.checkIn,
        location: data.location,
        photo: data.photo,
        state: data.state,
      },
    });
    return Response.json({ report: newReport, status: 201 });
  } catch (error) {
    return Response.json({
      errorMessage: 'error creating report',
      status: 500,
    });
  }
}
