"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";

export default function GlobeStasts({ locations }) {
  const canvasRef = useRef();
  useEffect(() => {
    const theme = window.localStorage.getItem("theme") || "light";

    let phi = 0;
    let width = 0;
    const onResize = () =>
      canvasRef.current && (width = canvasRef.current.offsetWidth);
    window.addEventListener("resize", onResize);
    onResize();
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.2,
      dark: theme === "dark" ? 1 : 0,
      diffuse: 1,
      mapSamples: 30000,
      mapBrightness: 8,
      baseColor:
        theme === "dark"
          ? [39 / 255, 39 / 255, 42 / 255]
          : [255 / 255, 255 / 255, 255 / 255],
      markerColor: [251 / 255, 100 / 255, 21 / 255],
      glowColor:
        theme === "dark"
          ? [39 / 255, 39 / 255, 42 / 255]
          : [255 / 255, 255 / 255, 255 / 255],
      markers: locations,
      opacity: 0.95,
      onRender: (state) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = phi;
        phi += 0.004;
        state.width = width * 2;
        state.height = width * 2;
      },
    });
    setTimeout(() => (canvasRef.current.style.opacity = "1"));
    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="w-full h-full relative m-auto aspect-square">
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-0"
        style={{
          transition: "opacity 1s ease",
        }}
      />
    </div>
  );
}
