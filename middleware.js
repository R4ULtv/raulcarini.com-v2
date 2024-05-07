import { NextResponse, userAgent } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico|assets|stats).*)",
};

export default async function middleware(req) {
  const agent = userAgent(req);

  const country = req.geo.country || null;
  const city = req.geo.city || null;
  const region = req.geo.region || null;

  const viewport = agent.device.type || null;
  const browser = agent.browser.name || null;
  const os = agent.os.name || null;
  const version = agent.os.version || null;

  const path = req.nextUrl.pathname;

  try {
    await redis.incr(path);
  } catch (error) {
    console.log(error);
  }

  return NextResponse.next();
}
