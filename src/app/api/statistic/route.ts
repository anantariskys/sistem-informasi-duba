import { prisma } from '@/client/lib/prisma';
import { HttpStatusCode } from 'axios';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Get both count and data in a single query for better performance
    const [totalGT, totalPJ, totalCGT, totalAdmin] = await prisma.$transaction([
      prisma.guruTugas.count({
        where: {
          status: 'tetap',
        },
      }),
      prisma.penanggunJawabGuruTugas.count(),
      prisma.guruTugas.count({
        where: {
          status: 'calon',
        },
      }),
      prisma.user.count({
        where: {
          role: 'admin',
        },
      }),
    ]);

    return NextResponse.json(
      {
        message: 'Successfully retrieved Statistics',
        data: {
          totalGT,
          totalPJ,
          totalCGT,
          totalAdmin,
        },
        success: true,
      },
      {
        status: HttpStatusCode.Ok,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Failed to retrieve Penanggung Jawab',
        error: error,
      },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}
