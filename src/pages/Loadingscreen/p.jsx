import React from "react";

/**
 * LoadingScreen
 * A minimal, centered loading screen for a SaaS dashboard.
 * Uses a soft gradient ring loader and the app's design system colors.
 *
 * Props:
 *  - appName: string — shown as the centered logo/wordmark
 *  - message: string — optional subtext below the loader
 */
export default function LoadingScreen({
  appName = "Dashboard",
  message = "Loading dashboard...",
}) {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f3f4f6",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
          padding: "48px 56px",
          borderRadius: "20px",
          background: "#FFFFFF",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        {/* Logo / App name */}
        <div
          style={{
            fontSize: "18px",
            fontWeight: 600,
            color: "#111827",
            letterSpacing: "-0.01em",
          }}
        >
          {appName}
        </div>

        {/* Gradient ring loader */}
        <GradientRingLoader />

        {/* Subtext */}
        <div
          style={{
            fontSize: "13px",
            fontWeight: 500,
            color: "#9CA3AF",
          }}
        >
          {message}
        </div>
      </div>

      <style>{`
        @keyframes ring-spin {
          to { transform: rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .grl-ring { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

function GradientRingLoader() {
  return (
    <div
      style={{
        position: "relative",
        width: "40px",
        height: "40px",
      }}
    >
      {/* static track */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          border: "3px solid #EDE9FE",
        }}
      />
      {/* animated gradient arc */}
      <div
        className="grl-ring"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          border: "3px solid transparent",
          borderTopColor: "#8B5CF6",
          borderRightColor: "#437FF7",
          animation: "ring-spin 0.9s linear infinite",
        }}
      />
    </div>
  );
}