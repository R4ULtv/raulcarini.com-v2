"use client";

import { useEffect, useState } from "react";
import numeral from "numeral";

export default function PageViews({ path }) {
  const [views, setViews] = useState(null);

  useEffect(() => {
    const addViews = async () => {
      await fetch("/api/views/" + path, {
        method: "POST",
      });
    };

    addViews();
  }, []);

  useEffect(() => {
    const fetchViews = async () => {
      const data = await fetch("/api/views/" + path).then((res) => res.json());
      setViews(data);
    };

    fetchViews();
  }, []);

  if (!views) {
    return null;
  }

  return <span className="text-sm">{views >= 1000 ? numeral(views).format("0.0a") : numeral(views).format()} views</span>;
}
