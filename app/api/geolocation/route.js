import { geolocation } from "@vercel/functions";
import { NextResponse } from "next/server";

export function GET(request) {
  const details = geolocation(request) || "Unknown";
  return NextResponse.json(details);
}
