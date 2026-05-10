import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import TripShell from "./trip-shell";

export default async function TripSegmentLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }
  const { id } = await params;
  const trip = await prisma.trip.findFirst({
    where: { id, userId: session.user.id },
    select: {
      id: true,
      title: true,
      destination: true,
      startDate: true,
      endDate: true,
      status: true,
      coverImage: true,
      isPublic: true,
    },
  });
  if (!trip) {
    notFound();
  }

  const shell = {
    ...trip,
    startDate: trip.startDate.toISOString(),
    endDate: trip.endDate.toISOString(),
    status: trip.status,
    isPublic: trip.isPublic,
  };

  return <TripShell trip={shell}>{children}</TripShell>;
}
