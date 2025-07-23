import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { suggestTaskPriority } from '@/lib/ai-service';

export async function POST(request: Request) {
  try {
    // Verify authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse request body
    const { title, description, dueDate } = await request.json();

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    // Get AI suggestion
    const priority = await suggestTaskPriority({
      title,
      description,
      dueDate: dueDate ? new Date(dueDate) : undefined,
    });

    return NextResponse.json({ priority });
  } catch (error) {
    console.error('Error in suggest-priority API:', error);
    return NextResponse.json(
      { error: 'Failed to get priority suggestion' },
      { status: 500 }
    );
  }
}

// Add OPTIONS handler for CORS preflight
// This is needed for the frontend to make requests to this API
// from a different origin (e.g., during development)
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
