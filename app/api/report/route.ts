import { authOptions } from '../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { createReportSchema } from '@/lib/zod/report';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const body = await req.json();
  const prisma = new PrismaClient();
  const { success, error, data } = createReportSchema.safeParse(body);

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

    let employee;
    if (data.type === 'driver') {
      const driver = await prisma.drivers.findUnique({
        where: {
          dpi: data.dpi,
        },
      });
      employee = driver;
    } else {
      const copilot = await prisma.copilot.findUnique({
        where: {
          dpi: data.dpi,
        },
      });
      employee = copilot;
    }

    if (!user) {
      return Response.json({ errorMessage: 'user not found', status: 404 });
    }
    if (report) {
      return Response.json({
        errorMessage: 'El reporte ya existe en la tabla.',
        status: 409,
      });
    }
    if (!employee) {
      return Response.json({
        errorMessage: `${data.type} not found`,
        status: 404,
      });
    }
    const newReport = await prisma.report.create({
      data: {
        employeeNumber: employee.employeeNumber,
        fullname: employee.fullname,
        dpi: employee.dpi,
        position: employee.position,
        schedule: employee.schedule,
        userId: user.id,
        checkIn: 'db-checkIn',
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

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  const prisma = new PrismaClient();

  if (!session || !session.user) {
    return Response.json({ error: 'unauthorized', status: 401 });
  }
  try {
    const reports = await prisma.report.findMany();
    return Response.json({ data: reports, status: 200 });
  } catch (error) {
    return Response.json({ error, status: 500 });
  }
}
