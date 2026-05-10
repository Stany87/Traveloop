import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { itineraryUpdateSchema } from "@/lib/validations";

export async function PUT(req: Request, ctx: { params: Promise<{ tripId: string }> }) {
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
  const parsed = itineraryUpdateSchema.safeParse(json);
  if (!parsed.success) {
    const msg = parsed.error.issues[0]?.message ?? "Invalid payload";
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  await prisma.$transaction(async (tx) => {
    await tx.tripDay.deleteMany({ where: { tripId } });
    for (const day of parsed.data.days) {
      await tx.tripDay.create({
        data: {
          tripId,
          dayIndex: day.dayIndex,
          date: new Date(day.date),
          title: day.title ?? null,
          activities: {
            create: day.activities.map((a, i) => ({
              time: a.time,
              title: a.title,
              type: a.type,
              duration: a.duration ?? null,
              image: a.image ?? null,
              costCents: a.costCents ?? null,
              completed: a.completed ?? false,
              sortOrder: a.sortOrder ?? i,
            })),
          },
        },
      });
    }
  });

  const updated = await prisma.trip.findFirst({
    where: { id: tripId },
    include: {
      days: {
        orderBy: { dayIndex: "asc" },
        include: { activities: { orderBy: { sortOrder: "asc" } } },
      },
    },
  });

  return NextResponse.json({ trip: updated });
}
