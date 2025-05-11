import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { Prisma, PrismaClient } from '@prisma/client';
import { employeeSchema } from '@/lib/zod/employee';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const body = await req.json();
  const prisma = new PrismaClient();
  const { success, error, data } = employeeSchema.safeParse(body);

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
    const copilot = await prisma.copilot.findFirst({
      where: {
        OR: [{ employeeNumber: data.employeeNumber }, { dpi: data.dpi }],
      },
    });
    if (!user) {
      return Response.json({ errorMessage: 'user not found', status: 404 });
    }
    if (copilot) {
      return Response.json({
        errorMessage: 'Número de gafete o DPI ya existen.',
        status: 409,
      });
    }
    const newCopilot = await prisma.copilot.create({
      data: {
        employeeNumber: data.employeeNumber,
        fullname: data.fullname,
        dpi: data.dpi,
        position: data.position,
        schedule: data.schedule,
        userId: user.id,
      },
    });
    return Response.json({ copilot: newCopilot, status: 201 });
  } catch (error) {
    return Response.json({
      errorMessage: 'error creating copilot',
      errorServer: error,
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
    const totalCopilots = await prisma.copilot.count();
    const remainingItems = totalCopilots - (page - 1) * perPage;
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
        selectedTimes
          ? {
              schedule: {
                in: filterSchedule,
              },
            }
          : {},
      ],
    };
    const copilots = await prisma.copilot.findMany({
      where,
      skip: (page - 1) * perPage,
      take: currentPageSize,
      orderBy: { createdAt: 'desc' },
    });
    const totalCopilotsWhere = await prisma.copilot.findMany({
      where,
    });
    const totalPages = Math.ceil(totalCopilotsWhere.length / perPage);

    if (remainingItems <= 0) {
      return Response.json({ error: 'Página fuera de rango.', status: 404 });
    }
    return Response.json({
      page,
      per_page: currentPageSize,
      total: totalCopilots,
      total_pages: totalPages,
      data: copilots,
    });
  } catch (error) {
    return Response.json({ error, status: 500 });
  }
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  const body = await req.json();
  const prisma = new PrismaClient();
  const { success, error, data } = employeeSchema.safeParse(body);

  if (!session || !session.user) {
    return Response.json({ error: 'unauthorized', status: 401 });
  }
  if (!success) {
    return Response.json({ errors: error.flatten(), status: 400 });
  }
  try {
    const existingCopilotWithSameValues = await prisma.copilot.findFirst({
      where: {
        AND: [
          {
            OR: [{ dpi: body.dpi }, { employeeNumber: body.employeeNumber }],
          },
          { uuid: { not: data.uuid } },
        ],
      },
    });
    if (existingCopilotWithSameValues) {
      return Response.json({
        errorMessage: 'Número de gafete o DPI ya existen.',
        status: 409,
      });
    }
    const updateCopilot = await prisma.copilot.update({
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
    return Response.json({ copilot: updateCopilot, status: 200 });
  } catch (error) {
    return Response.json({ error, status: 500 });
  }
}
