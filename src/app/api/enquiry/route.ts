import { NextRequest, NextResponse } from "next/server";

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitize(value: unknown, max = 500): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, max);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (typeof body !== "object" || body === null) {
      return NextResponse.json({ success: false, message: "Invalid request body." }, { status: 400 });
    }

    const name = sanitize(body.name, 100);
    const email = sanitize(body.email, 254);
    const subject = sanitize(body.subject, 200);
    const message = sanitize(body.message, 2000);

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ success: false, message: "Please fill out all required fields." }, { status: 400 });
    }
    if (!validateEmail(email)) {
      return NextResponse.json({ success: false, message: "Invalid email format." }, { status: 400 });
    }

    const enquiry = {
      id: Date.now().toString(36),
      name, email,
      phone: sanitize(body.phone, 20),
      subject, message,
      projectType: sanitize(body.projectType, 100),
      budget: sanitize(body.budget, 50),
      plan: sanitize(body.plan, 50),
      createdAt: new Date().toISOString(),
    };

    console.log("[Enquiry]", JSON.stringify(enquiry, null, 2));

    return NextResponse.json(
      { success: true, message: "Enquiry submitted successfully.", data: { id: enquiry.id } },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Enquiry] API error:", error);
    return NextResponse.json({ success: false, message: "An unexpected error occurred." }, { status: 500 });
  }
}
