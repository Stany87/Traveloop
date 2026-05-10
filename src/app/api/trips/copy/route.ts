import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const tripId = body?.tripId;
  if (!tripId) {
    return NextResponse.json({ error: "tripId required" }, { status: 400 });
  }

  const source = await prisma.trip.findFirst({
    where: { id: tripId, isPublic: true },
    include: {
      days: {
        orderBy: { dayIndex: "asc" },
        include: { activities: { orderBy: { sortOrder: "asc" } } },
      },
    },
  });

  if (!source) {
    return NextResponse.json({ error: "Trip not found or is private" }, { status: 404 });
  }

  const newTrip = await prisma.trip.create({
    data: {
      userId: session.user.id,
      title: `${source.title} (copy)`,
      destination: source.destination,
      startDate: source.startDate,
      endDate: source.endDate,
      travelerType: source.travelerType,
      budgetTotal: source.budgetTotal,
      currency: source.currency,
      coverImage: source.coverImage,
      status: "PLANNING",
      isPublic: false,
      days: {
        create: source.days.map((day) => ({
          dayIndex: day.dayIndex,
          date: day.date,
          title: day.title,
          activities: {
            create: day.activities.map((act) => ({
              title: act.title,
              type: act.type,
              time: act.time,
              sortOrder: act.sortOrder,
            })),
          },
        })),
      },
    },
  });

  return NextResponse.json({ trip: { id: newTrip.id } });
}
