import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const bodySchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1).max(20000),
});

export async function POST(req: Request, ctx: { params: Promise<{ tripId: string }> }) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { tripId } = await ctx.params;
  const trip = await prisma.trip.findFirst({
    where: { id: tripId, userId: session.user.id },
  });
  if (!trip) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const json = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid body" }, { status: 400 });
  }

  const note = await prisma.tripNote.create({
    data: {
      tripId,
      title: parsed.data.title,
      content: parsed.data.content,
    },
  });

  return NextResponse.json({ note });
}
