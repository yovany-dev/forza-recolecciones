import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { authOptions } from '@/lib/authOptions';

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
    const copilot = await prisma.copilot.findUnique({
      where: {
        uuid,
      },
    });
    if (!copilot) {
      return Response.json({ error: 'copilot not found', status: 404 });
    }
    const copilotEliminated = await prisma.copilot.delete({
      where: {
        uuid,
      },
    });
    return Response.json({
      message: 'Auxiliar eliminado exitosamente.',
      copilot: copilotEliminated,
      status: 200,
    });
  } catch (error) {
    return Response.json({ error, status: 500 });
  }
}
