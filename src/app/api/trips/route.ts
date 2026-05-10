import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { createTripSchema } from "@/lib/validations";
import { deriveTripStatus, eachTripDayDates } from "@/lib/trip-utils";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const trips = await prisma.trip.findMany({
    where: { userId: session.user.id },
    orderBy: { startDate: "desc" },
    include: {
      _count: { select: { days: true, expenses: true } },
    },
  });

  return NextResponse.json({ trips });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const json = await req.json().catch(() => null);
  const parsed = createTripSchema.safeParse(json);
  if (!parsed.success) {
    const msg = parsed.error.issues[0]?.message ?? "Invalid payload";
    return NextResponse.json({ error: msg, details: parsed.error.flatten() }, { status: 400 });
  }

  const startDate = new Date(parsed.data.startDate);
  const endDate = new Date(parsed.data.endDate);
  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime()) || endDate < startDate) {
    return NextResponse.json({ error: "Invalid date range" }, { status: 400 });
  }

  const status = deriveTripStatus(startDate, endDate);
  const dayDates = eachTripDayDates(startDate, endDate);

  const trip = await prisma.$transaction(async (tx) => {
    const t = await tx.trip.create({
      data: {
        userId: session.user!.id!,
        title: parsed.data.title,
        destination: parsed.data.destination,
        startDate,
        endDate,
        status,
        travelerType: parsed.data.travelerType || null,
        budgetTotal: parsed.data.budgetTotal ?? null,
        currency: parsed.data.currency || "USD",
        coverImage: parsed.data.coverImage || null,
      },
    });

    for (let i = 0; i < dayDates.length; i++) {
      await tx.tripDay.create({
        data: {
          tripId: t.id,
          dayIndex: i,
          date: dayDates[i]!,
          title: `Day ${i + 1}`,
        },
      });
    }

    const packingDefaults: { name: string; items: string[] }[] = [
      {
        name: "Clothing",
        items: ["T-shirts (×5)", "Light jacket", "Comfortable walking shoes"],
      },
      { name: "Documents", items: ["Passport / ID", "Travel insurance", "Booking confirmations"] },
      { name: "Electronics", items: ["Phone charger", "Universal adapter", "Headphones"] },
    ];
    for (let i = 0; i < packingDefaults.length; i++) {
      const p = packingDefaults[i]!;
      await tx.packingCategory.create({
        data: {
          tripId: t.id,
          name: p.name,
          sortOrder: i,
          items: {
            create: p.items.map((text, j) => ({ text, sortOrder: j })),
          },
        },
      });
    }

    return t;
  });

  return NextResponse.json({ trip });
}
