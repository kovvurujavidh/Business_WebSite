import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendTelegramNotification } from '@/lib/telegram';

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitizeString(value: unknown, maxLength = 500): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (trimmed.length === 0) return null;
  return trimmed.slice(0, maxLength);
}

function validateInput(body: Record<string, unknown>): {
  valid: boolean;
  errors: string[];
  data: {
    name: string;
    email: string;
    phone: string | null;
    subject: string;
    message: string;
    projectType: string | null;
    budget: string | null;
    timeline: string | null;
  };
} {
  const errors: string[] = [];

  const name = sanitizeString(body.name, 100);
  const email = sanitizeString(body.email, 254);
  const phone = sanitizeString(body.phone, 20);
  const subject = sanitizeString(body.subject, 200);
  const message = sanitizeString(body.message, 2000);
  const projectType = sanitizeString(body.projectType, 100);
  const budget = sanitizeString(body.budget, 50);
  const timeline = sanitizeString(body.timeline, 50);

  if (!name) errors.push('Name is required.');
  if (!email) {
    errors.push('Email is required.');
  } else if (!validateEmail(email)) {
    errors.push('Invalid email format.');
  }
  if (!subject) errors.push('Subject is required.');
  if (!message) errors.push('Message is required.');

  return {
    valid: errors.length === 0,
    errors,
    data: { name: name || '', email: email || '', phone, subject: subject || '', message: message || '', projectType, budget, timeline },
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (typeof body !== 'object' || body === null) {
      return NextResponse.json(
        { success: false, message: 'Invalid request body.' },
        { status: 400 }
      );
    }

    const { valid, errors, data } = validateInput(body);

    if (!valid) {
      return NextResponse.json(
        { success: false, message: 'Validation failed.', errors },
        { status: 400 }
      );
    }

    const enquiry = await prisma.enquiry.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        subject: data.subject,
        message: data.message,
        projectType: data.projectType || null,
        budget: data.budget || null,
        timeline: data.timeline || null,
      },
    });

    let telegramSent = false;
    try {
      telegramSent = await sendTelegramNotification({
        name: data.name,
        email: data.email,
        phone: data.phone ?? undefined,
        subject: data.subject,
        message: data.message,
        projectType: data.projectType ?? undefined,
        budget: data.budget ?? undefined,
        timeline: data.timeline ?? undefined,
      });
    } catch {
      console.error('[Enquiry] Telegram notification failed, but enquiry was saved.');
    }

    if (telegramSent) {
      await prisma.enquiry.update({
        where: { id: enquiry.id },
        data: { telegramNotified: true },
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Enquiry submitted successfully. We will get back to you shortly.',
        data: { id: enquiry.id },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[Enquiry] API error:', error);
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
