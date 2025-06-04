import { prisma } from '@/client/lib/prisma';
import { HttpStatusCode } from 'axios';
import { NextResponse } from 'next/server';
import { mkdir, unlink, writeFile } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  try {
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

    if (existingGT.foto) {
      const oldPhotoPath = join(process.cwd(), 'public', existingGT.foto);
      try {
        await unlink(oldPhotoPath);
      } catch (error) {
        console.error('Error deleting old photo:', error);
      }
    }

    const deletedPenanggungJawab = await prisma.guruTugas.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json(
      {
        message: 'Data deleted successfully',
        data: deletedPenanggungJawab,
        success: true,
      },
      { status: HttpStatusCode.Ok }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Failed to delete data',
        error: error,
      },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const formData = await req.formData();

  const nama = formData.get('nama') as string;
  const alamat = formData.get('alamat') as string;
  const jurusan = formData.get('jurusan') as string;
  const nomorHp = formData.get('nomorHp') as string | null;
  const penanggungJawabId = formData.get('penanggungJawabId');
  const foto = formData.get('foto');

  try {
    const existingGT = await prisma.guruTugas.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingGT) {
      return NextResponse.json(
        {
          message: 'Data GT tidak ditemukan',
          success: false,
        },
        { status: HttpStatusCode.NotFound }
      );
    }

    let fileUrl = existingGT.foto;

    if (foto && foto instanceof File) {
      if (existingGT.foto) {
        const oldPhotoPath = join(process.cwd(), 'public', existingGT.foto);
        try {
          await unlink(oldPhotoPath);
        } catch (error) {
          console.error('Error deleting old photo:', error);
        }
      }

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

    const updatedGT = await prisma.guruTugas.update({
      where: {
        id: Number(id),
      },
      data: {
        nama,
        alamat,
        jurusan,
        nomorHp,
        penanggungJawabId: penanggungJawabId ? Number(penanggungJawabId) : null,
        foto: fileUrl,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(
      {
        message: 'Data updated successfully',
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
