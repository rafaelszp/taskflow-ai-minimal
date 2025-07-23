import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import prisma from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

// GET /api/tasks - Listar todas as tarefas do usuário
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const tasks = await prisma.task.findMany({
      where: {
        user: {
          email: session.user.email,
        },
      },
      orderBy: {
        dueDate: 'asc',
      },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar tarefas' },
      { status: 500 }
    );
  }
}

// POST /api/tasks - Criar uma nova tarefa
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const { title, description, dueDate, priority: userPriority, useAISuggestion = false } = await request.json();

    if (!title) {
      return NextResponse.json(
        { error: 'Título é obrigatório' },
        { status: 400 }
      );
    }

    let priority = userPriority || 'medium';
    
    // Get AI suggestion if requested and no priority was provided
    if (useAISuggestion && !userPriority) {
      try {
        const aiResponse = await fetch(`${process.env.NEXTAUTH_URL}/api/ai/suggest-priority`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Cookie': request.headers.get('cookie') || '',
          },
          body: JSON.stringify({ title, description, dueDate }),
        });

        if (aiResponse.ok) {
          const { priority: suggestedPriority } = await aiResponse.json();
          priority = suggestedPriority || priority;
        }
      } catch (error) {
        console.error('Error getting AI suggestion:', error);
        // Continue with default priority if AI suggestion fails
      }
    }

    const taskData: any = {
      title,
      description,
      priority,
      status: 'todo',
      user: {
        connect: { email: session.user.email },
      },
    };

    // Only add dueDate if it's provided
    if (dueDate) {
      taskData.dueDate = new Date(dueDate);
    }

    const task = await prisma.task.create({
      data: taskData,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    return NextResponse.json(
      { error: 'Erro ao criar tarefa' },
      { status: 500 }
    );
  }
}
