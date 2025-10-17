import ImageResponse from "@takumi-rs/image-response";
import { MoonIcon } from "lucide-react";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "Raul Carini";
  const description = searchParams.get("description") || "Full-Stack Developer";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          color: "oklch(0.21 0.006 285.885)",
          padding: "4rem",
          backgroundColor: "oklch(0.92 0.004 286.32)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "16px",
            marginBottom: "12px",
            color: "oklch(0.21 0.006 285.885)",
          }}
        >
          <MoonIcon size={64} style={{ fill: "black" }} />
          {searchParams.get("title") && searchParams.get("description") && (
            <span
              style={{
                fontSize: 56,
                fontWeight: 600,
              }}
            >
              Raul Carini
            </span>
          )}
        </div>
        <p
          style={{
            fontWeight: 800,
            fontSize: 84,
            textOverflow: "ellipsis",
            lineClamp: 2,
            marginTop: "0.5em",
            marginBottom: "0.5em",
          }}
        >
          {title}
        </p>
        <span
          style={{
            fontSize: 48,
            color: "oklch(27.4% 0.006 286.033)",
            fontWeight: 500,
            lineClamp: 2,
            textOverflow: "ellipsis",
          }}
        >
          {description}
        </span>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      format: "WebP",
    },
  );
}
