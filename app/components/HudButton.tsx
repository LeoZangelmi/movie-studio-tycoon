"use client";

type HudButtonProps = {
  label: string;
  left: string;
  top: string;
  width: string;
  height: string;
  active?: boolean;
  onClick: () => void;
};

export default function HudButton({
  left,
  top,
  width,
  height,
  active = false,
  onClick,
}: HudButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        position: "absolute",
        left,
        top,
        width,
        height,

        border: active
          ? "2px solid rgba(250,204,21,.45)"
          : "2px solid transparent",

        borderRadius: "8px",

        backgroundColor: active
          ? "rgba(250,204,21,.08)"
          : "transparent",

        cursor: "pointer",

        pointerEvents: "auto",

        transition:
          "transform .12s ease, filter .12s ease, background-color .12s ease",
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform =
          "translateY(5px) scale(0.95)";
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform =
          "translateY(0px) scale(1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform =
          "translateY(0px) scale(1)";
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.filter =
          "brightness(1.15)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.filter =
          "brightness(1)";
      }}
    />
  );
}