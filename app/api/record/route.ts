import { now } from '@/lib/utils';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { reportStateSchema } from '@/lib/zod/report';
import { rangeSchema, daySchema } from '@/lib/zod/record';
import { parseISO, endOfDay, startOfDay } from 'date-fns';
import { Prisma, PrismaClient, Location, Photo, State } from '@prisma/client';

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  const prisma = new PrismaClient();
  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search');
  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const day = searchParams.get('day');
  const { success: successRange, data: dataRange } = rangeSchema.safeParse({
    from,
    to,
  });
  const { success: successDay, data: dataDay } = daySchema.safeParse(day);

  const whereCreatedAt = () => {
    let where = {};
    if (successRange) {
      where = {
        createdAt: {
          gte: startOfDay(parseISO(dataRange.from)),
          lte: endOfDay(parseISO(dataRange.to)),
        },
      };
    } else {
      if (successDay) {
        where = {
          createdAt: {
            gte: startOfDay(parseISO(dataDay)),
            lte: endOfDay(parseISO(dataDay)),
          },
        };
      } else {
        const startOfToday = now().startOf('day').toDate();
        const endOfToday = now().endOf('day').toDate();
        where = {
          createdAt: {
            gte: startOfToday,
            lte: endOfToday,
          },
        };
      }
    }
    return where;
  };
  const getArrayParam = (key: string) =>
    (searchParams.get(key) || '').split(',').filter((v) => v);

  const scheduleRaw = getArrayParam('fr_horario');
  const locationRaw = getArrayParam('fr_ubicación');
  const photoRaw = getArrayParam('fr_foto');
  const stateRaw = getArrayParam('fr_estado');

  const locationEnum = reportStateSchema.shape.location;
  const photoEnum = reportStateSchema.shape.photo;
  const stateEnum = reportStateSchema.shape.state;

  const filterLocation = locationRaw.filter((v) =>
    locationEnum.options.includes(v as Location)
  );
  const filterPhoto = photoRaw.filter((v) =>
    photoEnum.options.includes(v as Photo)
  );
  const filterState = stateRaw.filter((v) =>
    stateEnum.options.includes(v as State)
  );

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
          scheduleRaw.length
            ? {
                schedule: { in: scheduleRaw },
              }
            : {},
          filterLocation.length
            ? {
                location: { in: filterLocation as Location[] },
              }
            : {},
          filterPhoto.length
            ? {
                photo: { in: filterPhoto as Photo[] },
              }
            : {},
          filterState.length
            ? {
                state: { in: filterState as State[] },
              }
            : {},
          whereCreatedAt(),
        ],
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
    return Response.json({
      data: reports,
      status: 200,
    });
  } catch (error) {
    return Response.json({ error, status: 500 });
  }
}
