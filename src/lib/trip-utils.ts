import { TripStatus } from "@/generated/prisma/enums";

export function startOfDayUTC(d: Date): Date {
  const x = new Date(d);
  x.setUTCHours(0, 0, 0, 0);
  return x;
}

export function deriveTripStatus(startDate: Date, endDate: Date, now = new Date()): TripStatus {
  const today = startOfDayUTC(now);
  const start = startOfDayUTC(startDate);
  const end = startOfDayUTC(endDate);
  if (end < today) return TripStatus.COMPLETED;
  if (start > today) return TripStatus.UPCOMING;
  return TripStatus.PLANNING;
}

export function eachTripDayDates(startDate: Date, endDate: Date): Date[] {
  const out: Date[] = [];
  const cur = startOfDayUTC(startDate);
  const end = startOfDayUTC(endDate);
  let guard = 0;
  while (cur <= end && guard < 400) {
    out.push(new Date(cur));
    cur.setUTCDate(cur.getUTCDate() + 1);
    guard++;
  }
  return out;
}
