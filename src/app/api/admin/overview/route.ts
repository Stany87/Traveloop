import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { convertCurrency } from "@/lib/currency";

function isAdmin(email?: string | null) {
  if (!email) return false;
  const raw = process.env.ADMIN_EMAILS || "";
  if (!raw.trim()) return true;
  const set = new Set(
    raw
      .split(",")
      .map((x) => x.trim().toLowerCase())
      .filter(Boolean),
  );
  return set.has(email.toLowerCase());
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.id || !isAdmin(session.user.email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const [usersCount, tripsCount, publicTrips, expensesCount, expensesSum, recentTrips] = await Promise.all([
    prisma.user.count(),
    prisma.trip.count(),
    prisma.trip.count({ where: { isPublic: true } }),
    prisma.expense.count(),
    prisma.expense.findMany({ select: { amountCents: true, trip: { select: { currency: true } } } }),
    prisma.trip.findMany({
      orderBy: { createdAt: "desc" },
      take: 250,
      select: { destination: true, createdAt: true },
    }),
  ]);

  const totalExpensesCents = expensesSum.reduce((s, e) => s + convertCurrency(e.amountCents, e.trip.currency, "USD"), 0);

  const destinationCount = new Map<string, number>();
  for (const t of recentTrips) {
    const key = t.destination.trim();
    destinationCount.set(key, (destinationCount.get(key) ?? 0) + 1);
  }
  const topDestinations = Array.from(destinationCount.entries())
    .map(([destination, count]) => ({ destination, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  const months: { label: string; trips: number }[] = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const label = d.toLocaleDateString(undefined, { month: "short" });
    const trips = recentTrips.filter(
      (t) =>
        t.createdAt.getFullYear() === d.getFullYear() &&
        t.createdAt.getMonth() === d.getMonth(),
    ).length;
    months.push({ label, trips });
  }

  return NextResponse.json({
    summary: {
      usersCount,
      tripsCount,
      publicTrips,
      expensesCount,
      totalExpensesCents,
    },
    topDestinations,
    monthlyTrips: months,
  });
}
