import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  const userId = session?.user?.id;

  const trips = await prisma.trip.findMany({
    where: { isPublic: true },
    orderBy: { updatedAt: "desc" },
    take: 30,
    include: {
      user: { select: { id: true, name: true, image: true, city: true, country: true } },
      _count: { select: { interactions: true, days: true } },
      interactions: {
        where: userId ? { userId, type: "like" } : { type: "__none__" },
        select: { id: true },
      },
    },
  });

  const feed = trips.map((t) => ({
    id: t.id,
    title: t.title,
    destination: t.destination,
    coverImage: t.coverImage,
    status: t.status,
    startDate: t.startDate,
    endDate: t.endDate,
    updatedAt: t.updatedAt,
    daysCount: t._count.days,
    likesCount: t._count.interactions,
    likedByMe: Array.isArray(t.interactions) ? t.interactions.length > 0 : false,
    author: {
      id: t.user.id,
      name: t.user.name || "Traveler",
      image: t.user.image,
      city: t.user.city,
      country: t.user.country,
    },
  }));

  return NextResponse.json({ feed });
}
