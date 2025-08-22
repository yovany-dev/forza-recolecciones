import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { loginUnitsReportSchema } from '@/lib/zod/auth';
import { PrismaClient } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  const body = await req.json();
  const prisma = new PrismaClient();
  const { success, error, data } = loginUnitsReportSchema.safeParse(body);

  if (!success) {
    return Response.json({ errors: error.flatten(), status: 400 });
  }
  try {
    const driver = await prisma.drivers.findUnique({
      where: {
        employeeNumber: data.identity,
      },
    });

    if (!driver) {
      return Response.json({
        error: 'Número de gafete no existe.',
        status: 401,
      });
    }
    const token = jwt.sign(
      {
        uuid: driver.uuid,
        fullname: driver.fullname,
        dpi: driver.dpi,
        position: driver.position,
      },
      JWT_SECRET,
      { expiresIn: '1d' }
    );
    const res = NextResponse.json({ data: driver, status: 200 });
    res.cookies.set('driver-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24,
    });
    return res;
  } catch (error) {
    return Response.json({
      errorMessage: 'login error',
      errorServer: error,
      status: 500,
    });
  }
}
