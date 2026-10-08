import { ImageResponse } from "next/og";

export async function GET() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px", color: "#eeeae1", background: "#070706", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "14px", color: "#e0b363", fontSize: 20, letterSpacing: "0.18em" }}>
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#c99445" }}/>
        PORTFOLIO / 2026—27
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div style={{ color: "#817e76", fontSize: 20, letterSpacing: "0.18em" }}>KODURU</div>
        <div style={{ fontSize: 86, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 0.95 }}>KARTHIKEYA</div>
        <div style={{ color: "#c99445", fontSize: 34, fontWeight: 700, letterSpacing: "0.08em" }}>SOFTWARE DEVELOPER</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "22px", borderTop: "1px solid #36332d", color: "#817e76", fontSize: 16, letterSpacing: "0.13em" }}>
        <span>FULL-STACK DEVELOPMENT · BACKEND ENGINEERING · AI/ML FUNDAMENTALS</span>
        <span style={{ color: "#e0b363" }}>K.DEV</span>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
