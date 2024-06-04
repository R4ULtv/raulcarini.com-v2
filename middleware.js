import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico|assets|blocked).*)",
};

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function middleware(req) {
  const path = req.nextUrl.pathname;

  if (path.startsWith("/blog/")) {
    await redis.incr("@blog/pageviews:" + path.slice(6));
  }
  return NextResponse.next();
}
