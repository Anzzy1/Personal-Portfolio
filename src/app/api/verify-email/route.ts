import { verifyEmail } from "@/lib/email/verify";

// Lets the forms check an email as soon as the visitor leaves the field
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { email?: unknown } | null;
  const email = typeof body?.email === "string" ? body.email : "";
  return Response.json(await verifyEmail(email));
}
