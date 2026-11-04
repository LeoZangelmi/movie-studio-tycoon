"use client";

import { useState } from "react";

type HudButtonProps = {
  imageSrc: string;
  left: string;
  top: string;
  width: string;
  height: string;
  active?: boolean;
  onClick: () => void;
};

export default function HudButton({
  imageSrc,
  left,
  top,
  width,
  height,
  active = false,
  onClick,
}: HudButtonProps) {
  const [pressed, setPressed] =
    useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseDown={() =>
        setPressed(true)
      }
      onMouseUp={() =>
        setPressed(false)
      }
      onMouseLeave={() =>
        setPressed(false)
      }
      style={{
        position: "absolute",
        left,
        top,
        width,
        height,
        padding: 0,
        border: "none",
        background: "transparent",
        cursor: "pointer",
        pointerEvents: "auto",
        zIndex: 60,
      }}
    >
      <img
        src={imageSrc}
        alt=""
        draggable={false}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",

          transform: pressed
            ? "translateY(6px) scale(0.96)"
            : "translateY(0px) scale(1)",

          filter: active
            ? "brightness(1.12)"
            : "brightness(1)",

          transition:
            "transform .12s ease, filter .12s ease",

          pointerEvents: "none",
          userSelect: "none",
        }}
      />
    </button>
  );
}