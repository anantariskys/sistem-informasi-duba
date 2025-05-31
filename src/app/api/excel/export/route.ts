import { prisma } from '@/client/lib/prisma';
import { HttpStatusCode } from 'axios';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
 
    const [guruTugas, penanggungJawab, calonGuruTugas] = await prisma.$transaction([
      prisma.guruTugas.findMany({
        select: {
          nama: true,
          jurusan: true,
          alamat: true,
          nomorHp: true,
          createdAt: true,
          penanggungJawab: {
            select: {
              nama: true,
            },
          },
        }, 
        where: {
          status: 'tetap',
        },
      }),
      prisma.penanggunJawabGuruTugas.findMany({
        select: {
          nama: true,
          alamat: true,
          lembaga: true,
          createdAt: true,
        }, 
      }),
      prisma.guruTugas.findMany({
        select: {
            nama: true,
            jurusan: true,
            alamat: true,
            nomorHp: true,
            createdAt: true,
            penanggungJawab: {
              select: {
                nama: true,
              },
            },
          }, 
        where: {
          status: 'calon',
        },
      }),
    ]);

    return NextResponse.json(
      {
        message: 'Successfully retrieved Statistics',
        data: {
          guruTugas,
          penanggungJawab,
          calonGuruTugas,
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
