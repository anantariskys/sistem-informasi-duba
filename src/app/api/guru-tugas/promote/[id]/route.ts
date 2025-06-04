import { prisma } from '@/client/lib/prisma';
import { HttpStatusCode } from 'axios';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await context.params).id;

    const existingGT = await prisma.guruTugas.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingGT) {
      return NextResponse.json(
        {
          message: 'Data tidak ditemukan',
          success: false,
        },
        { status: HttpStatusCode.NotFound }
      );
    }

    const updatedGT = await prisma.guruTugas.update({
      where: {
        id: Number(id),
      },
      data: {
        status: 'tetap',
      },
    });

    return NextResponse.json(
      {
        message: 'Data promoted successfully',
        data: updatedGT,
        success: true,
      },
      { status: HttpStatusCode.Ok }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Failed to update data',
        error: error,
      },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}
