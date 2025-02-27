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

export async function POST(req: Request, res: Response) {
  const session = await getServerSession(authOptions);
  const data: Driver = await req.json();
  const prisma = new PrismaClient();

  try {
    if (!session) {
      return Response.json({ message: 'Debes iniciar sesión.' });
    }
    const newDriver = await prisma.drivers.create({
      data: {
        employeeNumber: data.employeeNumber,
        fullname: data.fullname,
        dpi: data.dpi,
        position: data.position,
        schedule: data.schedule,
      },
    });
    console.log(newDriver);
    return Response.json({ message: 'Driver create successfully' });
  } catch (error) {
    return Response.json({ error: error });
  }
}
