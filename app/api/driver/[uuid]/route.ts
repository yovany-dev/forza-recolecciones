import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ uuid: string }>;
  }
) {
  const session = await getServerSession(authOptions);
  const prisma = new PrismaClient();
  const { uuid } = await params;

  if (!session || !session.user) {
    return Response.json({ error: 'unauthorized', status: 401 });
  }
  try {
    const driver = await prisma.drivers.findUnique({
      where: {
        uuid,
      },
    });
    if (!driver) {
      return Response.json({ error: 'driver not found', status: 404 });
    }
    const driverEliminated = await prisma.drivers.delete({
      where: {
        uuid,
      },
    });
    return Response.json({
      message: 'Piloto eliminado exitosamente.',
      driver: driverEliminated,
      status: 200,
    });
  } catch (error) {
    return Response.json({ error, status: 500 });
  }
}
