import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { firstName, lastName, email, message } = await req.json();

  if (!firstName || !lastName || !email || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL ?? "Contact Form <onboarding@resend.dev>",
    to: process.env.CONTACT_TO_EMAIL!,
    replyTo: email,
    subject: `New message from ${firstName} ${lastName}`,
    text: `Name: ${firstName} ${lastName}\nEmail: ${email}\n\n${message}`,
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
