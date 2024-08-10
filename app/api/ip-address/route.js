import { ipAddress } from "@vercel/functions";
import { NextResponse } from "next/server";

export function GET(request) {
  const ip = ipAddress(request) || "Unknown";
  return NextResponse.json({ ip });
}
