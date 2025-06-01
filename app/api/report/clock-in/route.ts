import { now } from '@/lib/utils';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { clockInSchema } from '@/lib/zod/clockIn';
import { scheduleValidation } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const body = await req.json();
  const prisma = new PrismaClient();
  const {
    success: successSchema,
    error: errorSchema,
    data,
  } = clockInSchema.safeParse(body);

  if (!successSchema) {
    return NextResponse.json({ errors: errorSchema.flatten(), status: 400 });
  }
  try {
    const driver = await prisma.drivers.findMany({
      where: {
        dpi: data.dpi,
      },
    });
    const copilot = await prisma.copilot.findMany({
      where: {
        dpi: data.dpi,
      },
    });
    const employee = driver.concat(copilot)[0];
    if (!employee) {
      return NextResponse.json({
        status: 404,
        message: 'employee does not exist',
      });
    }

    const startOfToday = now().startOf('day').toDate();
    const endOfToday = now().endOf('day').toDate();
    const report = await prisma.report.findFirst({
      where: {
        dpi: employee.dpi,
        createdAt: {
          gte: startOfToday,
          lt: endOfToday,
        },
      },
    });
    if (report) {
      return NextResponse.json({
        errorMessage: 'report is already created.',
        status: 409,
      });
    }

    let clockIn;
    const currentClockIn = await prisma.clockIn.findFirst({
      where: {
        dpi: data.dpi,
      },
    });
    if (currentClockIn) {
      const res = await prisma.clockIn.update({
        where: {
          uuid: currentClockIn.uuid,
        },
        data: {
          latitude: String(data.latitude),
          longitude: String(data.longitude),
          photoUrl: data.photoURL ? data.photoURL : '',
        },
      });
      clockIn = res;
    } else {
      const res = await prisma.clockIn.create({
        data: {
          employeeUuid: data.employeeUUID,
          dpi: data.dpi,
          latitude: String(data.latitude),
          longitude: String(data.longitude),
          photoUrl: data.photoURL ? data.photoURL : '',
        },
      });
      clockIn = res;
    }

    const result = await prisma.$queryRawUnsafe<{ current_time: string }[]>(`
      SELECT to_char(CURRENT_TIME(0)::time, 'HH24:MI') as current_time
    `);
    const currentTime = result[0].current_time;
    const newReport = await prisma.report.create({
      data: {
        employeeNumber: employee.employeeNumber,
        fullname: employee.fullname,
        dpi: employee.dpi,
        position: employee.position,
        schedule: employee.schedule,
        checkIn: currentTime,
        location:
          data.latitude && data.longitude ? 'DETECTADA' : 'NO_DETECTADA',
        photo: data.photoURL ? 'CARGADA' : 'NO_CARGADA',
        state: scheduleValidation(employee.schedule, currentTime),
      },
    });
    return NextResponse.json({ report: newReport, clockIn, status: 201 });
  } catch (error) {
    return NextResponse.json({
      errorMessage: 'error creating report',
      errorServer: error,
      status: 500,
    });
  }
}
