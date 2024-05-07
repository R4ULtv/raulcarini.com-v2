import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function PageViews({ path }) {
  const views = await redis.get(path)

  return (
    <span className="text-sm">{views} views</span>
  )
}
