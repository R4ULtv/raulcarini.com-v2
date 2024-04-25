import { ImageResponse } from "@vercel/og";
export const runtime = "edge";

export const alt = "Raul Carini";
export const size = {
  width: 843,
  height: 441,
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
          alignItems: "center",
          justifyContent: "space-around",
          padding: "60px",
          backgroundColor: "rgb(24 24 27 / 255)",
          color: "rgb(228 228 231 /255)",
          fontSize: 100,
          fontWeight: 700,
        }}
      >
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: 50,
            right: 50,
            zIndex: 1,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <img
          width="128"
          height="128"
          src={`https://github.com/r4ultv.png`}
          style={{
            borderRadius: 128,
          }}
        />
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
