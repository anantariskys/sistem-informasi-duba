import { prisma } from '@/client/lib/prisma';
import { EditAdminPayloadWithId } from '@/client/module/dashboard/admin/types/type';
import { hashPassword, verifyPassword } from '@/server/utils/password';
import { HttpStatusCode } from 'axios';
import { NextResponse } from 'next/server';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    // Delete the record from database
    const deletedPenanggungJawab = await prisma.user.delete({
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
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = (await request.json()) as EditAdminPayloadWithId;

    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: 'User not found',
          success: false,
        },
        { status: HttpStatusCode.NotFound }
      );
    }

    if (user.role !== 'admin') {
      return NextResponse.json(
        {
          message: 'User is not an admin',
          success: false,
        },
        { status: HttpStatusCode.Forbidden }
      );
    }

    const isPasswordCorrect = await verifyPassword(body.password, user.password);
    console.log(isPasswordCorrect);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        {
          message: 'Password is incorrect',
          success: false,
        },
        { status: HttpStatusCode.BadRequest }
      );
    }
    // Hash the new password if provided
    let hashedPassword = user.password;
    if (body.confirmPassword) {
      hashedPassword = await hashPassword(body.confirmPassword);
    }

    // Update the record in database
    const updatedPenanggungJawab = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
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
