import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const now = new Date();
    const twentyFourHoursFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const tasks = await prisma.task.findMany({
      where: {
        user: {
          email: session.user.email,
        },
        dueDate: {
          gte: now,
          lte: twentyFourHoursFromNow,
        },
        status: {
          not: 'done',
        },
      },
      orderBy: {
        dueDate: 'asc',
      },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Error fetching upcoming deadlines:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar prazos próximos' },
      { status: 500 }
    );
  }
}
