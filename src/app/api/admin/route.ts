import { prisma } from '@/client/lib/prisma';
import { AdminPayload } from '@/client/module/dashboard/admin/schema/adminSchema';
import { hashPassword } from '@/server/utils/password';
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
    const [penanggungJawab, totalPenanggungJawab] = await prisma.$transaction([
      prisma.user.findMany({
        skip: skip,
        take: limit,
        orderBy: {
          name: 'asc',
        },
        where: {
          role: 'admin',
          name: {
            contains: keyword,
          },
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          password: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.user.count({
        where: {
          role: 'admin',
          name: {
            contains: keyword,
          },
        },
      }),
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
  const { name, email, password } = (await req.json()) as AdminPayload;

  if (!name || !email || !password) {
    return NextResponse.json(
      {
        message: 'Name, email, and password are required',
        success: false,
      },
      { status: HttpStatusCode.BadRequest }
    );
  }
  try {
    const hashedPassword = await hashPassword(password);
    const penanggungJawab = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        role: 'admin',
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
