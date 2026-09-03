import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyOwner } from '@/lib/auth';

function sanitizeString(value: unknown, maxLength = 500): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (trimmed.length === 0) return null;
  return trimmed.slice(0, maxLength);
}

function validateRating(value: unknown): number | null {
  const num = Number(value);
  if (!Number.isInteger(num) || num < 1 || num > 5) return null;
  return num;
}

function validateInput(body: Record<string, unknown>) {
  const errors: string[] = [];
  const name = sanitizeString(body.name, 100);
  const email = sanitizeString(body.email, 254);
  const rating = validateRating(body.rating);
  const title = sanitizeString(body.title, 200);
  const content = sanitizeString(body.content, 2000);
  const projectRef = sanitizeString(body.projectRef, 100);

  if (!name) errors.push('Name is required.');
  if (rating === null) errors.push('Rating must be between 1 and 5.');
  if (!title) errors.push('Title is required.');
  if (!content) errors.push('Review content is required.');

  return {
    valid: errors.length === 0,
    errors,
    data: { name: name || '', email: email || null, rating: rating ?? 5, title: title || '', content: content || '', projectRef: projectRef || null },
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (typeof body !== 'object' || body === null) {
      return NextResponse.json({ success: false, message: 'Invalid request body.' }, { status: 400 });
    }

    const { valid, errors, data } = validateInput(body);
    if (!valid) {
      return NextResponse.json({ success: false, message: 'Validation failed.', errors }, { status: 400 });
    }

    const review = await prisma.review.create({
      data: {
        name: data.name,
        email: data.email,
        rating: data.rating,
        title: data.title,
        content: data.content,
        projectRef: data.projectRef,
        approved: true,
        featured: false,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Review submitted successfully.',
      data: { id: review.id },
    }, { status: 201 });
  } catch (error) {
    console.error('[Reviews] POST error:', error);
    return NextResponse.json({ success: false, message: 'An unexpected error occurred.' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featuredOnly = searchParams.get('featured') === 'true';
    const all = searchParams.get('all') === 'true';
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? Math.min(Math.max(parseInt(limitParam, 10) || 10, 1), 50) : 10;

    const where = all ? {} : { approved: true, ...(featuredOnly ? { featured: true } : {}) };

    const reviews = await prisma.review.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: all ? 100 : limit,
      select: {
        id: true, name: true, rating: true, title: true, content: true,
        projectRef: true, featured: true, approved: true, createdAt: true,
      },
    });

    return NextResponse.json({ success: true, data: reviews });
  } catch (error) {
    console.error('[Reviews] GET error:', error);
    return NextResponse.json({ success: false, message: 'An unexpected error occurred.' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const auth = verifyOwner(request);
    if (!auth.authorized) {
      return NextResponse.json({ success: false, message: 'Unauthorized.' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, message: 'Review ID required.' }, { status: 400 });
    }

    await prisma.review.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Review deleted.' });
  } catch (error) {
    console.error('[Reviews] DELETE error:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete review.' }, { status: 500 });
  }
}
