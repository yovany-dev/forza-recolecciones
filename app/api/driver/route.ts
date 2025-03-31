import { authOptions } from '../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { driverSchema } from '@/lib/zod/driver';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const body = await req.json();
  const prisma = new PrismaClient();
  const { success, error, data } = driverSchema.safeParse(body);

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
    const driver = await prisma.drivers.findFirst({
      where: {
        OR: [{ employeeNumber: data.employeeNumber }, { dpi: data.dpi }],
      },
    });
    if (!user) {
      return Response.json({ errorMessage: 'user not found', status: 404 });
    }
    if (driver) {
      return Response.json({
        errorMessage: 'Número de gafete o DPI ya existen.',
        status: 409,
      });
    }
    const newDriver = await prisma.drivers.create({
      data: {
        employeeNumber: data.employeeNumber,
        fullname: data.fullname,
        dpi: data.dpi,
        position: data.position,
        schedule: data.schedule,
        userId: user.id,
      },
    });
    return Response.json({ driver: newDriver, status: 201 });
  } catch (error) {
    return Response.json({
      errorMessage: 'error creating driver',
      status: 500,
    });
  }
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  const prisma = new PrismaClient();
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const search = searchParams.get('search');
  const filterSchedule = searchParams.get('fr_horario')?.split(',') || [];
  const perPage = 10;

  if (!session || !session.user) {
    return Response.json({ error: 'unauthorized', status: 401 });
  }
  if (isNaN(page)) {
    return Response.json({
      error: "El parámetro 'page' debe ser un valor numérico.",
      status: 400,
    });
  } else if (page < 1) {
    return Response.json({
      error: "El parámetro 'page' deben ser números positivos.",
      status: 400,
    });
  }
  try {
    const totalDrivers = await prisma.drivers.count();
    const totalPages = Math.ceil(totalDrivers / perPage);
    const remainingItems = totalDrivers - (page - 1) * perPage;
    const currentPageSize = Math.min(perPage, remainingItems);
    const availableTimes = ['07:30', '08:30'];
    const selectedTimes = availableTimes.some((hour) =>
      filterSchedule.includes(hour)
    );
    const where = {
      AND: [
        search
          ? {
              OR: [
                {
                  employeeNumber: {
                    contains: search as string,
                    mode: 'insensitive' as 'insensitive',
                  },
                },
                {
                  fullname: {
                    contains: search as string,
                    mode: 'insensitive' as 'insensitive',
                  },
                },
                {
                  dpi: {
                    contains: search as string,
                    mode: 'insensitive' as 'insensitive',
                  },
                },
              ],
            }
          : {},
        selectedTimes
          ? {
              schedule: {
                in: filterSchedule,
              },
            }
          : {},
      ],
    };
    const drivers = await prisma.drivers.findMany({
      where,
      skip: (page - 1) * perPage,
      take: currentPageSize,
      orderBy: { createdAt: 'desc' },
    });

    if (remainingItems <= 0) {
      return Response.json({ error: 'Página fuera de rango.', status: 404 });
    }
    return Response.json({
      page,
      per_page: currentPageSize,
      total: totalDrivers,
      total_pages: totalPages,
      data: drivers,
    });
  } catch (error) {
    return Response.json({ error, status: 500 });
  }
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  const body = await req.json();
  const prisma = new PrismaClient();
  const { success, error, data } = driverSchema.safeParse(body);

  if (!session || !session.user) {
    return Response.json({ error: 'unauthorized', status: 401 });
  }
  if (!success) {
    return Response.json({ errors: error.flatten(), status: 400 });
  }
  try {
    const existingDriverWithSameValues = await prisma.drivers.findFirst({
      where: {
        AND: [
          {
            OR: [{ dpi: body.dpi }, { employeeNumber: body.employeeNumber }],
          },
          { uuid: { not: data.uuid } },
        ],
      },
    });
    if (existingDriverWithSameValues) {
      return Response.json({
        errorMessage: 'Número de gafete o DPI ya existen.',
        status: 409,
      });
    }
    const updateDriver = await prisma.drivers.update({
      where: {
        uuid: data.uuid,
      },
      data: {
        employeeNumber: data.employeeNumber,
        fullname: data.fullname,
        dpi: data.dpi,
        schedule: data.schedule,
      },
    });
    return Response.json({ driver: updateDriver, status: 200 });
  } catch (error) {
    return Response.json({ error, status: 500 });
  }
}
