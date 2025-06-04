// app/api/save-excel/route.ts
import { prisma } from '@/client/lib/prisma';
import { KorwilData } from '@/client/module/dashboard/home/types/type';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = (await req.json()) as KorwilData[];

  if (!body || body.length === 0) {
    return NextResponse.json(
      {
        message: 'Data tidak valid',
        success: false,
      },
      { status: 400 }
    );
  }



  for (const data of body) {
    const {  penanggungJawab } = data;

    await prisma.$transaction(async (tx) => {
      for (const item of penanggungJawab) {
        const pjData = await tx.penanggunJawabGuruTugas.create({
          data: {
            nama: item.nama_pjgt || '',
            alamat: item.alamat,
            lembaga: item.lembaga,
          },
        });

        for (const gt of item.guru_tugas || []) {
           await tx.guruTugas.create({
            data: {
              nama: gt.nama_gt || '',
              alamat: gt.alamat_gt || '',
              jurusan: gt.jurusan || '',
              nomorHp: gt.no_telepon || '',
              penanggungJawabId: pjData.id,
            },
          })
        }
      }
      
    });
  }

  return NextResponse.json({ message: 'Data berhasil diterima di server' });
}
