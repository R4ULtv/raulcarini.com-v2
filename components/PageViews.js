import { Redis } from "@upstash/redis";
import numeral from "numeral";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function PageViews({ path }) {
  await redis.incr(path);
  const views = await redis.get(path)

  return (
    <span className="text-sm">{numeral(views).format("0a")} views</span>
  )
}
