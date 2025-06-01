import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { loginClockInSchema } from '@/lib/zod/auth';
import { PrismaClient } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  const body = await req.json();
  const prisma = new PrismaClient();
  const { success, error, data } = loginClockInSchema.safeParse(body);

  if (!success) {
    return Response.json({ errors: error.flatten(), status: 400 });
  }
  try {
    const driver = await prisma.drivers.findMany({
      where: {
        OR: [
          {
            employeeNumber: data.identity,
          },
          {
            dpi: data.identity,
          },
        ],
      },
    });
    const copilot = await prisma.copilot.findMany({
      where: {
        OR: [
          {
            employeeNumber: data.identity,
          },
          {
            dpi: data.identity,
          },
        ],
      },
    });
    const employee = driver.concat(copilot)[0];

    if (!employee) {
      return Response.json({ error: 'Gafete o DPI incorrecto.', status: 401 });
    }
    const token = jwt.sign(
      {
        uuid: employee.uuid,
        fullname: employee.fullname,
        dpi: employee.dpi,
        position: employee.position,
      },
      JWT_SECRET,
      { expiresIn: '1d' }
    );
    const res = NextResponse.json({ data: employee, status: 200 });
    res.cookies.set('employee-token', token, {
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
