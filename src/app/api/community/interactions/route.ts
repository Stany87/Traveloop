import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  tripId: z.string().min(1),
  type: z.literal("like"),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const json = await req.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { tripId, type } = parsed.data;
  const trip = await prisma.trip.findFirst({
    where: { id: tripId, isPublic: true },
    select: { id: true },
  });
  if (!trip) {
    return NextResponse.json({ error: "Trip not found" }, { status: 404 });
  }

  const existing = await prisma.tripInteraction.findFirst({
    where: { tripId, userId: session.user.id, type },
    select: { id: true },
  });

  if (existing) {
    await prisma.tripInteraction.delete({ where: { id: existing.id } });
  } else {
    await prisma.tripInteraction.create({
      data: { tripId, userId: session.user.id, type },
    });
  }

  const likesCount = await prisma.tripInteraction.count({
    where: { tripId, type: "like" },
  });

  return NextResponse.json({ likedByMe: !existing, likesCount });
}
