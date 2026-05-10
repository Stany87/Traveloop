"use server";

import { hash } from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validations";

export type RegisterState = { error?: string };

export async function registerUser(_prev: RegisterState, formData: FormData): Promise<RegisterState> {
  const raw = {
    firstName: String(formData.get("firstName") ?? "").trim(),
    lastName: String(formData.get("lastName") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim() || undefined,
    city: String(formData.get("city") ?? "").trim() || undefined,
    country: String(formData.get("country") ?? "").trim() || undefined,
    image: String(formData.get("image") ?? "").trim() || undefined,
    password: String(formData.get("password") ?? ""),
  };

  const parsed = registerSchema.safeParse(raw);

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const email = parsed.data.email.toLowerCase().trim();
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "An account with this email already exists." };
  }

  const passwordHash = await hash(parsed.data.password, 12);
  const displayName = `${parsed.data.firstName} ${parsed.data.lastName}`.trim();

  await prisma.user.create({
    data: {
      email,
      passwordHash,
      firstName: parsed.data.firstName,
      lastName: parsed.data.lastName,
      name: displayName,
      phone: parsed.data.phone || null,
      city: parsed.data.city || null,
      country: parsed.data.country || null,
      image: parsed.data.image || null,
    },
  });

  redirect("/login?registered=1");
}
