"use client";

import * as React from "react";

export function useMediaQuery(query) {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const subscribe = React.useCallback(
    (callback) => {
      if (!isClient) return () => {};
      const matchMedia = window.matchMedia(query);

      matchMedia.addEventListener("change", callback);
      return () => {
        matchMedia.removeEventListener("change", callback);
      };
    },
    [query, isClient]
  );

  const getSnapshot = () => {
    if (!isClient) return false;
    return window.matchMedia(query).matches;
  };

  const getServerSnapshot = () => {
    return false;
  };

  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
