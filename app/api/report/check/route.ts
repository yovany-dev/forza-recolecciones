import { now } from '@/lib/utils';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export async function GET(req: Request) {
  const prisma = new PrismaClient();
  const { searchParams } = new URL(req.url);
  const dpi = searchParams.get('dpi');

  if (!dpi) {
    return NextResponse.json({
      errorMessage: "parameter 'dpi' is required.",
      status: 400,
    });
  }
  try {
    const startOfToday = now().startOf('day').toDate();
    const endOfToday = now().endOf('day').toDate();
    const report = await prisma.report.findFirst({
      where: {
        dpi: dpi,
        createdAt: {
          gte: startOfToday,
          lt: endOfToday,
        },
      },
    });
    if (!report) {
      return NextResponse.json({
        errorMessage: 'report not found',
        status: 404,
      });
    }
    return NextResponse.json({ data: report, status: 200 });
  } catch (error) {
    return NextResponse.json({
      errorMessage: 'error creating report',
      errorServer: error,
      status: 500,
    });
  }
}
