import { NextResponse } from "next/server";
import { buildItinerary } from "@/lib/planner";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const plan = buildItinerary(body ?? {});
    return NextResponse.json(plan);
  } catch {
    try {
      const fallback = buildItinerary({});
      return NextResponse.json({ ...fallback, fallback: true });
    } catch {
      return NextResponse.json(
        { error: "The planner could not create an itinerary. Please try again." },
        { status: 500 }
      );
    }
  }
}
