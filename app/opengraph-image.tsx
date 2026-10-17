import { ImageResponse } from "next/og";

export const alt = "Edwin Schipper - Ontwerpbureau Schipper";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#0f172a",
          padding: "80px",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "24px",
            }}
          >
            ES
          </div>
          <span
            style={{
              fontSize: "28px",
              fontWeight: 600,
              letterSpacing: "-0.5px",
              color: "#94a3b8",
            }}
          >
            Edwin Schipper
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div
            style={{
              fontSize: "64px",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-1.5px",
              color: "#f8fafc",
            }}
          >
            Ontwerpbureau Schipper
          </div>
          <div
            style={{
              fontSize: "30px",
              fontWeight: 400,
              color: "#94a3b8",
              maxWidth: "900px",
            }}
          >
            UX, Vormgeving &amp; Web Development
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "22px",
            color: "#64748b",
          }}
        >
          <span>Portfolio &amp; Showcase</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
