import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { TripStatus } from "@/generated/prisma/enums";
import { convertCurrency } from "@/lib/currency";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { baseCurrency: true },
  });

  const baseCurrency = user?.baseCurrency || "INR";

  const trips = await prisma.trip.findMany({
    where: { userId: session.user.id },
    include: { expenses: true },
    orderBy: { startDate: "asc" },
  });

  const activeTrips = trips.filter(
    (t) => t.status === TripStatus.PLANNING || t.status === TripStatus.UPCOMING,
  ).length;

  const totalPlannedCents = trips.reduce((s, t) => {
    return s + convertCurrency(t.budgetTotal ?? 0, t.currency, baseCurrency);
  }, 0);

  const spentCents = trips.reduce((s, t) => {
    const tripSpent = t.expenses.reduce((e, x) => e + x.amountCents, 0);
    return s + convertCurrency(tripSpent, t.currency, baseCurrency);
  }, 0);

  const now = new Date();
  const horizon = new Date(now);
  horizon.setFullYear(horizon.getFullYear() + 1);

  let daysOnRoad = 0;
  for (const t of trips) {
    if (t.endDate < now) continue;
    const start = t.startDate > now ? t.startDate : now;
    const end = t.endDate < horizon ? t.endDate : horizon;
    if (start <= end) {
      daysOnRoad += Math.ceil((end.getTime() - start.getTime()) / 86400000) + 1;
    }
  }

  const upcoming = trips.filter((t) => t.startDate > now && t.status !== TripStatus.COMPLETED);
  const nextTrip =
    upcoming[0] ??
    trips.find((t) => t.status !== TripStatus.COMPLETED) ??
    trips[0] ??
    null;

  return NextResponse.json({
    stats: {
      activeTrips,
      totalPlannedCents,
      spentCents,
      daysOnRoad,
      baseCurrency,
    },
    featured: nextTrip
      ? {
          id: nextTrip.id,
          title: nextTrip.title,
          destination: nextTrip.destination,
          startDate: nextTrip.startDate.toISOString(),
          endDate: nextTrip.endDate.toISOString(),
          coverImage: nextTrip.coverImage,
          status: nextTrip.status,
        }
      : null,
  });
}
