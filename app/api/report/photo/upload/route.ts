// import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { uuidSchema } from '@/lib/zod/clockIn';

export async function POST(request: Request): Promise<NextResponse> {
  const prisma = new PrismaClient();
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');
  const {
    success: successFilename,
    error: errorSchema,
    data: uuid,
  } = uuidSchema.safeParse(filename);

  if (!successFilename) {
    return NextResponse.json({
      status: 400,
      error: errorSchema.flatten(),
      message: 'filname parameter must be of type uuid',
    });
  }
  if (!request.body) {
    return NextResponse.json({
      status: 404,
      message: 'photo not found',
    });
  }
  try {
    const driver = await prisma.drivers.findMany({
      where: {
        uuid,
      },
    });
    const copilot = await prisma.copilot.findMany({
      where: {
        uuid,
      },
    });
    const employee = driver.concat(copilot)[0];
    if (!employee) {
      return NextResponse.json({
        status: 404,
        message: 'uuid does not exist',
      });
    }

    return NextResponse.json({});
    // const blob = await put(uuid, request.body, {
    //   access: 'public',
    //   allowOverwrite: true,
    // });
    // return NextResponse.json(blob);
  } catch (error) {
    return NextResponse.json({
      status: 500,
      error,
      message: 'error uploading photo',
    });
  }
}
