import bcrypt from 'bcrypt';
import { loginSchema } from '@/lib/zod/auth';
import { PrismaClient } from '@prisma/client';

export async function POST(req: Request) {
  const body = await req.json();
  const prisma = new PrismaClient();
  const { success, error, data } = loginSchema.safeParse(body);

  if (!success) {
    return Response.json({ errors: error.flatten(), status: 400 });
  }
  try {
    const user = await prisma.users.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!user) {
      return Response.json({ error: 'Usuario no encontrado.', status: 401 });
    }
    const isPasswordCorrect = await bcrypt.compare(
      data.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return Response.json({ error: 'Contraseña incorrecta.', status: 401 });
    }
    return Response.json({ success: true, status: 200 });
  } catch (error) {
    return Response.json({
      errorMessage: 'login error',
      errorServer: error,
      status: 500,
    });
  }
}
