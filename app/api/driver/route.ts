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
    return Response.json({ error: 'unauthorized' }, { status: 401 });
  }
  if (!success) {
    return Response.json({ error: error.flatten() }, { status: 400 });
  }
  try {
    const user = await prisma.users.findUnique({
      where: { email: session.user.email },
    });
    // const driver = await prisma.drivers.findUnique({
    //   where: {
    //     employeeNumber_dpi: {
    //       employeeNumber: data.employeeNumber,
    //       dpi: data.dpi,
    //     }
    //   }
    // });
    // console.log(driver)
    if (!user) {
      return Response.json({ error: 'user not found' }, { status: 404 });
    }
    // if (driver) {
    //   return Response.json({ message: 'Algunos datos ya existen'}, {status: 200})
    // }
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
