"use client";

import { useEffect, useState } from "react";

export function useScreenSize() {
  const [screen, setScreen] = useState({
    width: 1920,
    height: 1080,
  });

  useEffect(() => {
    const update = () => {
      setScreen({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    update();

    window.addEventListener("resize", update);

    return () =>
      window.removeEventListener("resize", update);
  }, []);

  return screen;
}