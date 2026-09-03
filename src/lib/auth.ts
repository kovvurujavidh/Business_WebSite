import { NextRequest } from 'next/server';

const OWNER_SECRET = process.env.OWNER_SECRET || 'javid-portfolio-owner-2026';

export function verifyOwner(request: NextRequest): { authorized: boolean } {
  const authHeader = request.headers.get('authorization');
  const cookieToken = request.cookies.get('owner_token')?.value;

  const token = authHeader?.replace('Bearer ', '') || cookieToken;

  if (!token || token !== OWNER_SECRET) {
    return { authorized: false };
  }

  return { authorized: true };
}

export function getOwnerToken(): string {
  return OWNER_SECRET;
}
