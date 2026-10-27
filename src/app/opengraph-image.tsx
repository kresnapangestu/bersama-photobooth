import { ImageResponse } from "next/og";
import { OG_IMAGE, SITE } from "@/constants/site";

export const alt = OG_IMAGE.alt;
export const size = { width: OG_IMAGE.width, height: OG_IMAGE.height };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          background: "#fbf9fe",
          color: "#4c4672",
        }}
      >
        <div style={{ fontSize: 132, fontWeight: 800, color: "#c2b8ff" }}>
          {SITE.name}
        </div>
        <div style={{ fontSize: 96, fontWeight: 300, color: "#bea4ff" }}>
          Photo Booth
        </div>
        <div style={{ fontSize: 36, marginTop: 40, maxWidth: 820 }}>
          Snap, smile, repeat — turn fleeting moments into lasting memories.
        </div>
      </div>
    ),
    size
  );
}
