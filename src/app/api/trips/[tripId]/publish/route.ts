import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request, ctx: { params: Promise<{ tripId: string }> }) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { tripId } = await ctx.params;
  const body = await req.json().catch(() => ({}));
  const isPublic = Boolean((body as { isPublic?: boolean }).isPublic);

  const trip = await prisma.trip.findFirst({
    where: { id: tripId, userId: session.user.id },
    select: { id: true },
  });
  if (!trip) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const updated = await prisma.trip.update({
    where: { id: tripId },
    data: { isPublic },
    select: { id: true, isPublic: true },
  });

  return NextResponse.json({ trip: updated });
}
