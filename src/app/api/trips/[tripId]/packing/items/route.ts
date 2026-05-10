import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request, ctx: { params: Promise<{ tripId: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { tripId } = await ctx.params;
  const { categoryId, text } = await req.json();

  if (!categoryId || !text) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // Ensure user owns trip
  const trip = await prisma.trip.findFirst({ where: { id: tripId, userId: session.user.id } });
  if (!trip) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const maxOrder = await prisma.packingItem.aggregate({
    where: { categoryId },
    _max: { sortOrder: true },
  });

  const item = await prisma.packingItem.create({
    data: {
      categoryId,
      text,
      sortOrder: (maxOrder._max.sortOrder ?? -1) + 1,
    },
  });

  return NextResponse.json({ item });
}
