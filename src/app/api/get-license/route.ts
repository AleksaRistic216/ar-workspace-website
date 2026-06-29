import { getLicenseByEmail } from "@/lib/keygen";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email || !email.includes("@")) {
    return Response.json({ error: "Valid email required" }, { status: 400 });
  }

  const key = await getLicenseByEmail(email);
  return Response.json({ key });
}
