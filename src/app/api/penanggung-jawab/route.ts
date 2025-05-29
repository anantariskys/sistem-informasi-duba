import { prisma } from '@/client/lib/prisma';
import { PJPayload } from '@/client/module/dashboard/penanggungJawab/schema/PJSchema';
import { HttpStatusCode } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;
  const skip = (page - 1) * limit;

  try {
    // Get both count and data in a single query for better performance
    const [penanggungJawab, totalPenanggungJawab] = await prisma.$transaction([
      prisma.penanggunJawabGuruTugas.findMany({
        skip: skip,
        take: limit,
        orderBy: {
          nama: 'asc',
        },
        select: {
          id: true,
          nama: true,
          lembaga: true,
          alamat: true,
          guruTugas: {
            select: {
              nama: true,
              id: true,
            },
          },
        },
      }),
      prisma.penanggunJawabGuruTugas.count(),
    ]);

    const totalPages = Math.ceil(totalPenanggungJawab / limit);

    return NextResponse.json(
      {
        message: 'Successfully retrieved Penanggung Jawab',
        data: penanggungJawab,
        metadata: {
          currentPage: page,
          totalPages: totalPages,
          totalItems: totalPenanggungJawab,
          itemsPerPage: limit,
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
export async function POST(req: NextRequest) {
  const { nama,alamat,lembaga } = (await req.json()) as PJPayload;


  if (!nama) {
    return NextResponse.json(
      {
        message: 'Nama is required',
        success: false,
      },
      { status: HttpStatusCode.BadRequest }
    );
  }
  try {
    const penanggungJawab = await prisma.penanggunJawabGuruTugas.create({
      data: {
        nama: nama,
        alamat: alamat,
        lembaga: lembaga,
      },
    });

    return NextResponse.json(
      {
        message: 'Successfully retrieved Penanggung Jawab',
        data: penanggungJawab,
        success: true,
      },
      {
        status: HttpStatusCode.Ok,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: 'Failed to retrieve Penanggung Jawab',
        error: error,
      },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}
