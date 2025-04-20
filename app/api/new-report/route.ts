import { authOptions } from '../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  const prisma = new PrismaClient();
  const { searchParams } = new URL(req.url);
  const drivers = searchParams.get('drivers')?.split(',') || [];
  const copilots = searchParams.get('copilots')?.split(',') || [];

  if (!session || !session.user) {
    return Response.json({ error: 'unauthorized', status: 401 });
  }
  try {
    let filteredDrivers: any[] = [];
    let filteredCopilots: any[] = [];
    if (drivers.length > 0) {
      const driverRes = await prisma.drivers.findMany({
        where: {
          employeeNumber: { notIn: drivers },
        },
      });
      filteredDrivers = driverRes;
    }
    if (copilots.length > 0) {
      const copilotRes = await prisma.copilot.findMany({
        where: {
          employeeNumber: { notIn: copilots },
        },
      });
      filteredCopilots = copilotRes;
    }
    const data = filteredDrivers.concat(filteredCopilots);
    const sortedData = data.sort((a, b) => {
      return a.fullname.localeCompare(b.fullname);
    });
    return Response.json({
      data: sortedData,
      status: 200,
    });
  } catch (error) {
    return Response.json({ error, status: 500 });
  }
}
