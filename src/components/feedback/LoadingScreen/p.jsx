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
    <div className="flex min-h-screen w-full items-center justify-center bg-background" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, sans-serif" }}>
      <div className="flex flex-col items-center gap-6 rounded-card bg-surface p-12 shadow-subtle">
        {/* Logo / App name */}
        <div className="text-lg font-semibold tracking-tight text-text">{appName}</div>

        {/* Gradient ring loader */}
        <GradientRingLoader />

        {/* Subtext */}
        <div className="text-xs font-medium text-text-muted">{message}</div>
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