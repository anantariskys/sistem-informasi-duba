import { prisma } from '@/client/lib/prisma';
import { HttpStatusCode } from 'axios';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const option = await prisma.penanggunJawabGuruTugas.findMany({
        select:{
            nama: true,
            id: true
        }
    });

    return NextResponse.json(
      {
        message: 'Successfully retrieved Penanggung Jawab option',
        data: option,

        success: true,
      },
      {
        status: HttpStatusCode.Ok,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Failed to retrieve Penanggung Jawab option',
        error: error,
      },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}
