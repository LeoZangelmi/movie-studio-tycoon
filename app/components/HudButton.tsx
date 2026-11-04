"use client";

type HudButtonProps = {
  label: string;
  left: string;
  width: string;
  onClick: () => void;
};

export default function HudButton({
  left,
  width,
  onClick,
}: HudButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        position: "absolute",
        left,
        top: "53%",
        width,
        height: "42%",

        border: "none",

        background: "transparent",

        cursor: "pointer",

        transition:
          "transform .12s ease, filter .12s ease",
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform =
          "translateY(6px) scale(0.96)";

        e.currentTarget.style.filter =
          "brightness(0.8)";
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform =
          "translateY(0px) scale(1)";

        e.currentTarget.style.filter =
          "brightness(1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform =
          "translateY(0px) scale(1)";

        e.currentTarget.style.filter =
          "brightness(1)";
      }}
    />
  );
}
