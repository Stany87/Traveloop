"use client";

import ItineraryBuilder from "@/components/ItineraryBuilder";

export default function BuildTripPage() {
  return (
    <div className="pt-4">
      {/* We reuse the beautifully designed ItineraryBuilder component here */}
      <div className="-mt-20">
        <ItineraryBuilder />
      </div>
    </div>
  );
}
