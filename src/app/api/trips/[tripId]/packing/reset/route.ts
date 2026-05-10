import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request, ctx: { params: Promise<{ tripId: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { tripId } = await ctx.params;

  // Ensure user owns trip
  const trip = await prisma.trip.findFirst({ where: { id: tripId, userId: session.user.id } });
  if (!trip) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.packingItem.updateMany({
    where: { category: { tripId } },
    data: { checked: false },
  });

  return NextResponse.json({ success: true });
}
