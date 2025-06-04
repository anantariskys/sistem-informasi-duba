import { prisma } from '@/client/lib/prisma';
import { HttpStatusCode } from 'axios';
import { NextResponse } from 'next/server';

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await context.params).id;

    const deletedPenanggungJawab = await prisma.penanggunJawabGuruTugas.delete({
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
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await context.params).id;
    const body = await request.json();

    const updatedPenanggungJawab = await prisma.penanggunJawabGuruTugas.update({
      where: {
        id: Number(id),
      },
      data: {
        nama: body.nama,
        alamat: body.alamat,
        lembaga: body.lembaga,
        foto: body.foto,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(
      {
        message: 'Data updated successfully',
        data: updatedPenanggungJawab,
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
