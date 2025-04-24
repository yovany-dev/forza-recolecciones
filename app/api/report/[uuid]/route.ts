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
    const report = await prisma.report.findUnique({
      where: {
        uuid,
      },
    });
    if (!report) {
      return Response.json({ error: 'report not found', status: 404 });
    }
    const reportEliminated = await prisma.report.delete({
      where: {
        uuid,
      },
    });
    return Response.json({
      message: 'Reporte eliminado exitosamente.',
      report: reportEliminated,
      status: 200,
    });
  } catch (error) {
    return Response.json({ error, status: 500 });
  }
}
