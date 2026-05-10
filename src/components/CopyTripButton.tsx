"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Copy, Check, Loader2 } from "lucide-react";

export default function CopyTripButton({ tripId }: { tripId: string }) {
  const router = useRouter();
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  const handleCopy = async () => {
    setState("loading");
    try {
      const res = await fetch("/api/trips/copy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tripId }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (res.status === 401) {
          router.push(`/login?callbackUrl=/shared/${tripId}`);
          return;
        }
        throw new Error((data as { error?: string }).error || "Copy failed");
      }

      const data = await res.json();
      setState("done");
      setTimeout(() => {
        router.push(`/dashboard/trips/${data.trip.id}`);
      }, 800);
    } catch {
      setState("error");
      setTimeout(() => setState("idle"), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      disabled={state === "loading" || state === "done"}
      className={`px-8 py-3 font-bold rounded-xl transition-colors shadow-xl disabled:opacity-70 ${
        state === "done"
          ? "bg-emerald-500 text-white"
          : state === "error"
            ? "bg-red-500 text-white"
            : "bg-white text-black hover:bg-white/90"
      }`}
    >
      {state === "loading" && (
        <span className="flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          Copying…
        </span>
      )}
      {state === "idle" && (
        <span className="flex items-center gap-2">
          <Copy className="w-4 h-4" />
          Copy to My Trips
        </span>
      )}
      {state === "done" && (
        <span className="flex items-center gap-2">
          <Check className="w-4 h-4" />
          Copied! Redirecting…
        </span>
      )}
      {state === "error" && "Failed — try again"}
    </button>
  );
}
