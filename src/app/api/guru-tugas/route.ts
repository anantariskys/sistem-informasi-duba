import { prisma } from '@/client/lib/prisma';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { HttpStatusCode } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;
  const keyword = searchParams.get('keyword') || '';
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
          foto: true,
          penanggungJawab: {
            select: {
              id: true,
              nama: true,
            },
          },
        },
        where: {
          status: 'tetap',
          nama: {
            contains: keyword,
          }
        },
      }),
      prisma.guruTugas.count({
        where: {
          status: 'tetap',
          nama: {
            contains: keyword,
          }
        },
      }),
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
  const formData = await req.formData();

  const nama = formData.get('nama') as string;
  const alamat = formData.get('alamat') as string;
  const jurusan = formData.get('jurusan') as string;
  const nomorHp = formData.get('nomorHp') as string | null;
  const penanggungJawabId = formData.get('penanggungJawabId');
  const foto = formData.get('foto');


  if (!nama || !alamat || !jurusan) {
    return NextResponse.json(
      {
        message: 'Nama, alamat, dan jurusan harus diisi',
        success: false,
      },
      { status: 400 }
    );
  }

  let fileUrl: string | undefined = undefined;

  if (foto && foto instanceof File) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(foto.type)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Format file tidak didukung',
        },
        { status: 400 }
      );
    }

    const bytes = await foto.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${uuidv4()}.${foto.name.split('.').pop()}`;
    const folder = join(process.cwd(), 'public', 'uploads');
    await mkdir(folder, { recursive: true });
    const filePath = join(folder, fileName);
    await writeFile(filePath, buffer);
    fileUrl = `/uploads/${fileName}`;
  }

  try {
    const guruTugas = await prisma.guruTugas.create({
      data: {
        nama,
        alamat,
        jurusan,
        nomorHp: nomorHp ?? undefined,
        penanggungJawabId: penanggungJawabId ? Number(penanggungJawabId) : undefined,
        foto: fileUrl,
      },
      include: {
        penanggungJawab: {
          select: {
            id: true,
            nama: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: 'Successfully created Guru Tugas',
        data: guruTugas,
        success: true,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Failed to create Guru Tugas',
        error,
      },
      { status: 500 }
    );
  }
}
