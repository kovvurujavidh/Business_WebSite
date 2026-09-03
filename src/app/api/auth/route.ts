import { NextRequest, NextResponse } from 'next/server';
import { verifyOwner } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json({ success: false, message: 'Password required.' }, { status: 400 });
    }

    const auth = verifyOwner(
      new Request(request.url, {
        headers: { authorization: `Bearer ${password}` },
      }) as NextRequest
    );

    if (!auth.authorized) {
      return NextResponse.json({ success: false, message: 'Invalid credentials.' }, { status: 401 });
    }

    const response = NextResponse.json({ success: true, message: 'Authenticated.' });
    response.cookies.set('owner_token', password, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    return response;
  } catch {
    return NextResponse.json({ success: false, message: 'Auth failed.' }, { status: 500 });
  }
}
