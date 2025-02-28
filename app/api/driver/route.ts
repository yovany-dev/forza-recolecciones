import { authOptions } from '../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';

interface Driver {
  employeeNumber: number;
  fullname: string;
  dpi: number;
  schedule: string;
  position: string;
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const data: Driver = await req.json();
  const prisma = new PrismaClient();

  if (!session || !session.user) {
    return Response.json({ error: 'unauthorized' }, { status: 401 });
  }
  // Validar los campos recibidos....

  try {
    const user = await prisma.users.findUnique({
      where: { email: session.user.email },
    });
    if (!user) {
      return Response.json({ error: 'user not found' }, { status: 404 });
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
    return Response.json(newDriver, { status: 201 });
  } catch (error) {
    return Response.json({ error: 'error creating driver' }, { status: 500 });
  }
}
