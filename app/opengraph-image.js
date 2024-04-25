import { ImageResponse } from "next/og";
export const runtime = "edge";

export const alt = "Raul Carini";
export const size = {
  width: 1200,
  height: 600,
};

export const contentType = "image/png";

export default async function GET(request) {
  const fontData = await fetch(
    new URL("/assets/Geist-Black.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "60px",
          backgroundColor: "rgb(24 24 27 / 255)",
          color: "rgb(228 228 231 /255)",
          fontSize: 100,
          fontWeight: 700,
        }}
      >
        Raul Carini
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "GeistVF",
          data: fontData,
          style: "normal",
        },
      ],
    }
  );
}
