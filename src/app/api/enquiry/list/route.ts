import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyOwner } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const auth = verifyOwner(request);
    if (!auth.authorized) {
      return NextResponse.json({ success: false, message: 'Unauthorized.' }, { status: 401 });
    }

    const enquiries = await prisma.enquiry.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    return NextResponse.json({ success: true, data: enquiries });
  } catch (error) {
    console.error('[EnquiryList] GET error:', error);
    return NextResponse.json({ success: false, message: 'Error.' }, { status: 500 });
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
      return NextResponse.json({ success: false, message: 'ID required.' }, { status: 400 });
    }

    await prisma.enquiry.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Enquiry deleted.' });
  } catch (error) {
    console.error('[EnquiryList] DELETE error:', error);
    return NextResponse.json({ success: false, message: 'Failed.' }, { status: 500 });
  }
}
