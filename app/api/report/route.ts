import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { Prisma, PrismaClient } from '@prisma/client';
import { createReportSchema, updateReportSchema } from '@/lib/zod/report';
import { now } from '@/lib/utils';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const body = await req.json();
  const prisma = new PrismaClient();
  const { success, error, data } = createReportSchema.safeParse(body);
  const startOfToday = now().startOf('day').toDate();
  const endOfToday = now().endOf('day').toDate();

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
      where: {
        dpi: data.dpi,
        createdAt: {
          gte: startOfToday,
          lt: endOfToday,
        },
      },
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
    const result = await prisma.$queryRawUnsafe<{ current_time: string }[]>(`
      SELECT to_char(CURRENT_TIME(0)::time, 'HH24:MI') as current_time
    `);
    const currentTime = result[0].current_time;
    const newReport = await prisma.report.create({
      data: {
        employeeNumber: employee.employeeNumber,
        fullname: employee.fullname,
        dpi: employee.dpi,
        position: employee.position,
        schedule: employee.schedule,
        userId: user.id,
        checkIn: currentTime,
        location: data.location,
        photo: data.photo,
        state: data.state,
      },
    });
    return Response.json({ report: newReport, status: 201 });
  } catch (error) {
    return Response.json({
      errorMessage: 'error creating report',
      errorServer: error,
      status: 500,
    });
  }
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  const prisma = new PrismaClient();
  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search');
  const startOfToday = now().startOf('day').toDate();
  const endOfToday = now().endOf('day').toDate();
  const startOfTodayTime = now().startOf('day');
  const endOfTodayTime = now().endOf('day');
  const currentTime = now();

  console.log('Comienzo de hoy: ', startOfTodayTime.format('YYYY-MM-DD HH:mm'));
  console.log('Fin de hoy: ', endOfTodayTime.format('YYYY-MM-DD HH:mm'));
  console.log('Hora en Guatemala: ', currentTime.format('DD/MM/YYYY hh:mm'));

  if (!session || !session.user) {
    return Response.json({ error: 'unauthorized', status: 401 });
  }
  try {
    const reports = await prisma.report.findMany({
      where: {
        AND: [
          search
            ? {
                OR: [
                  {
                    employeeNumber: {
                      contains: search,
                      mode: Prisma.QueryMode.insensitive,
                    },
                  },
                  {
                    fullname: {
                      contains: search,
                      mode: Prisma.QueryMode.insensitive,
                    },
                  },
                  {
                    dpi: {
                      contains: search,
                      mode: Prisma.QueryMode.insensitive,
                    },
                  },
                ],
              }
            : {},
          {
            createdAt: {
              gte: startOfToday,
              lte: endOfToday,
            },
          },
        ],
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
    return Response.json({
      data: reports,
      status: 200,
      date: {
        startOfTodayTime: `${startOfTodayTime}`,
        endOfTodayTime: `${endOfTodayTime}`,
        currentTime: `${currentTime}`,
      },
    });
  } catch (error) {
    return Response.json({ error, status: 500 });
  }
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  const body = await req.json();
  const prisma = new PrismaClient();
  const { success, error, data } = updateReportSchema.safeParse(body);

  if (!session || !session.user) {
    return Response.json({ error: 'unauthorized', status: 401 });
  }
  if (!success) {
    return Response.json({ errors: error.flatten(), status: 400 });
  }
  try {
    const user = await prisma.users.findUnique({
      where: { email: session.user.email },
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
    if (!employee) {
      return Response.json({
        errorMessage: `${data.type} not found`,
        status: 404,
      });
    }
    const updateReport = await prisma.report.update({
      where: {
        uuid: data.uuid,
      },
      data: {
        employeeNumber: employee.employeeNumber,
        fullname: employee.fullname,
        dpi: employee.dpi,
        schedule: employee.schedule,
        position: employee.position,
        uuid: data.uuid,
        checkIn: data.checkIn,
        location: data.location,
        photo: data.photo,
        state: data.state,
      },
    });
    return Response.json({ report: updateReport, status: 200 });
  } catch (error) {
    return Response.json({ error, status: 500 });
  }
}
