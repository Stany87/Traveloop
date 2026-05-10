"use client";

import { useParams } from "next/navigation";
import TripItineraryEditor from "@/components/TripItineraryEditor";

export default function BuildTripPage() {
  const params = useParams();
  const id = params.id as string;
  return (
    <div className="pt-4">
      <TripItineraryEditor tripId={id} />
    </div>
  );
}
