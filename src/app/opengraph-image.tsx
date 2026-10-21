import { ImageResponse } from "next/og";
import { site, homeCopy } from "@/lib/content";
import { themeColor } from "@/lib/theme";

export const alt =
  "Chenar by Joseph Unaogu — Websites, AI automation, and writing";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 64,
        background: themeColor("light", "canvas"),
        color: themeColor("light", "text"),
        borderTop: `12px solid ${themeColor("light", "accent")}`,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 32,
        }}
      >
        <div style={{ display: "flex", fontSize: 46, fontWeight: 700 }}>
          {site.brand}
        </div>
        <div style={{ display: "flex", color: themeColor("light", "muted") }}>
          {site.name}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          maxWidth: 1000,
          fontSize: 74,
          fontWeight: 700,
          lineHeight: 1.13,
          letterSpacing: "-0.04em",
        }}
      >
        {homeCopy.headline}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 25,
          color: themeColor("light", "accent"),
        }}
      >
        <div style={{ display: "flex" }}>
          Websites · AI automation · Writing
        </div>
        <div style={{ display: "flex" }}>Nigeria · Working worldwide</div>
      </div>
    </div>,
    size,
  );
}
