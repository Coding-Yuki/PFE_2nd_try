import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    console.log('[v0] GET /api/auth/me called');
    const session = await getSession();
    
    console.log('[v0] Session:', session);
    if (!session) {
      console.log('[v0] No session found');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        major: true,
        studentId: true,
        avatarUrl: true,
      },
    });

    if (!user) {
      console.log('[v0] User not found for session id:', session.id);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    console.log('[v0] User found:', user.email);
    return NextResponse.json(user);
  } catch (error) {
    console.error('[v0] Error fetching user data:', error);
    return NextResponse.json({ error: 'Internal server error', details: String(error) }, { status: 500 });
  }
}
