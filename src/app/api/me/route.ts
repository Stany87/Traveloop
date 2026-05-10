import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { profileUpdateSchema } from "@/lib/validations";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      name: true,
      phone: true,
      city: true,
      country: true,
      image: true,
      bio: true,
      baseCurrency: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ user });
}

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const json = await req.json().catch(() => null);
  const parsed = profileUpdateSchema.safeParse(json);
  if (!parsed.success) {
    const msg = parsed.error.issues[0]?.message ?? "Invalid payload";
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  const data = parsed.data;
  const email = data.email.trim().toLowerCase();
  const existing = await prisma.user.findFirst({
    where: { email, NOT: { id: session.user.id } },
    select: { id: true },
  });
  if (existing) {
    return NextResponse.json({ error: "Email already in use" }, { status: 409 });
  }

  const firstName = data.firstName.trim();
  const lastName = data.lastName.trim();
  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: {
      email,
      firstName,
      lastName,
      name: `${firstName} ${lastName}`.trim(),
      phone: data.phone?.trim() || null,
      city: data.city?.trim() || null,
      country: data.country?.trim() || null,
      image: data.image?.trim() || null,
      baseCurrency: data.baseCurrency?.trim() || "INR",
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      name: true,
      phone: true,
      city: true,
      country: true,
      image: true,
      bio: true,
      baseCurrency: true,
    },
  });

  return NextResponse.json({ user });
}
