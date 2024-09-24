import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

export const runtime = "edge";
export const revalidate = 60;

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export async function GET(request) {
  const path = request.nextUrl.searchParams.get("path");
  const views = await redis.get("@blog/pageviews:" + path);
  return NextResponse.json(views);
}

export async function POST(request) {
  const path = request.nextUrl.searchParams.get("path");
  await redis.incr("@blog/pageviews:" + path);
  return NextResponse.json({ success: true });
}
