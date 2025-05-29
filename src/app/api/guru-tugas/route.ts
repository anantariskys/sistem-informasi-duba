import { prisma } from '@/client/lib/prisma';
import { GTPayload } from '@/client/module/dashboard/guruTugas/schema/GTSchema';
import { HttpStatusCode } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;
  const skip = (page - 1) * limit;

  try {
    // Get both count and data in a single query for better performance
    const [guruTugas, totalGuruTugas] = await prisma.$transaction([
      prisma.guruTugas.findMany({
        skip: skip,
        take: limit,
        orderBy: {
          id: 'asc',
        },
        select: {
          id: true,
          alamat: true,
          jurusan: true,
          nama: true,
          nomorHp: true,
          status: true,
          createdAt: true,
          penanggungJawab: {
            select: {
              id: true,
              nama: true,
            },
          },
        },
      }),
      prisma.guruTugas.count(),
    ]);

    const totalPages = Math.ceil(totalGuruTugas / limit);

    return NextResponse.json(
      {
        message: 'Successfully retrieved guruTugas',
        data: guruTugas,
        metadata: {
          currentPage: page,
          totalPages: totalPages,
          totalItems: totalGuruTugas,
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
        message: 'Failed to retrieve guruTugas',
        error: error,
      },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}

export async function POST(req: NextRequest) {
  const { nama, alamat, jurusan, nomorHp, penanggungJawabId } = (await req.json()) as GTPayload;

  if (!nama || !alamat || !jurusan) {
    return NextResponse.json(
      {
        message: 'Nama, alamat, and jurusan are required',
        success: false,
      },
      { status: HttpStatusCode.BadRequest }
    );
  }

  try {
    const guruTugas = await prisma.guruTugas.create({
      data: {
        nama,
        alamat,
        jurusan,
        nomorHp,
        penanggungJawabId
      },
      include: {
        penanggungJawab: {
          select: {
            id: true,
            nama: true
          }
        }
      }
    });

    return NextResponse.json(
      {
        message: 'Successfully created Guru Tugas',
        data: guruTugas,
        success: true,
      },
      {
        status: HttpStatusCode.Created,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Failed to create Guru Tugas',
        error: error,
      },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}
