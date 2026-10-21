import { ImageResponse } from "next/og";
import { themeColor } from "@/lib/theme";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        background: themeColor("light", "accent"),
        color: themeColor("light", "on-accent"),
        fontSize: 48,
        fontWeight: 700,
      }}
    >
      c
    </div>,
    size,
  );
}
