import { MapPin, Calendar, Clock, Share2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCoverImage } from "@/lib/images";
import CopyTripButton from "@/components/CopyTripButton";

export default async function SharedItineraryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const trip = await prisma.trip.findFirst({
    where: { id, isPublic: true },
    include: {
      user: { select: { name: true, image: true } },
      days: {
        orderBy: { dayIndex: "asc" },
        include: { activities: { orderBy: { sortOrder: "asc" } } },
      },
    },
  });

  if (!trip) notFound();

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Read-Only Top Bar */}
      <div className="h-16 bg-[#0d1117] border-b border-white/[0.04] flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="text-white/40 text-sm font-medium">Shared by</span>
          <div className="flex items-center gap-2 bg-white/[0.05] px-3 py-1 rounded-full">
            <div className="w-5 h-5 rounded-full overflow-hidden">
              <Image src={trip.user.image || "/santorini.png"} alt="Creator" width={20} height={20} className="object-cover" />
            </div>
            <span className="text-white text-xs font-bold">{trip.user.name || "Traveler"}</span>
          </div>
        </div>
        
        <Link href="/signup" className="flex items-center gap-2 px-4 py-2 bg-[#e8834a] text-white text-xs font-bold rounded-lg hover:bg-[#d4713b] transition-colors">
          Create Your Own Trip
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Trip Header Banner */}
        <div className="relative h-80 rounded-[2rem] overflow-hidden mb-12 shadow-2xl">
          <Image 
            src={getCoverImage(trip.destination, trip.coverImage)} 
            alt={trip.destination} 
            fill 
            className="object-cover" 
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-10">
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              {trip.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/80 font-medium">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#e8834a]" />
                {trip.destination}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#e8834a]" />
                {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
              </div>
            </div>
          </div>

          <button className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors border border-white/10">
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Itinerary Timeline */}
        <div className="space-y-12">
          {trip.days.map((day, i) => (
            <div key={day.id}>
              {/* Day Header */}
              <div className="flex items-end gap-4 mb-6">
                <div className="bg-[#161b22] px-4 py-2 rounded-xl border border-white/[0.04]">
                  <div className="text-xs text-[#e8834a] font-bold uppercase tracking-wider">Day {i + 1}</div>
                  <div className="text-white font-semibold">{new Date(day.date).toLocaleDateString()}</div>
                </div>
                <div className="pb-2">
                  <h3 className="text-xl font-bold text-white/90">{day.title || `Day ${i + 1}`}</h3>
                </div>
              </div>

              {/* Day Items */}
              <div className="relative pl-8 space-y-6 before:absolute before:inset-y-0 before:left-[15px] before:w-[2px] before:bg-white/[0.04]">
                {day.activities.map((item, j) => (
                  <div key={j} className="relative flex items-start gap-6">
                    <div className="absolute -left-[31px] w-8 h-8 rounded-full bg-[#0a0a0a] border-4 border-[#161b22] flex items-center justify-center z-10">
                      <div className="w-2 h-2 rounded-full bg-white/20" />
                    </div>
                    
                    <div className="flex-1 bg-[#0d1117] border border-white/[0.04] p-5 rounded-2xl">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2 text-[#e8834a] text-sm font-bold">
                          <Clock className="w-4 h-4" />
                          {item.time}
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-white/[0.05] rounded-md text-white/50">{item.type}</span>
                      </div>
                      <h4 className="text-lg font-bold text-white">{item.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-20 pt-10 border-t border-white/[0.04] text-center">
          <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>Inspired by this trip?</h2>
          <p className="text-white/40 mb-6 max-w-md mx-auto">Copy this itinerary and customize it to match your perfect travel style with Traveloop.</p>
          <CopyTripButton tripId={trip.id} />
        </div>
      </div>
    </div>
  );
}
