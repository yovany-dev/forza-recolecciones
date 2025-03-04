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
    return Response.json({ errors: 'unauthorized', status: 401 });
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
        message: 'Número de gafete o DPI ya existen.',
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
    return Response.json({driver: newDriver, status: 201});
  } catch (error) {
    return Response.json({ errorMessage: 'error creating driver', status: 500 });
  }
}
