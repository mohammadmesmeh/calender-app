import React from "react";
import GradientRingLoader from "../GradientRingLoader";

/**
 * LoadingScreen
 * Minimal, centered loading screen for a SaaS dashboard.
 * Refactored to use Tailwind utility classes only — same visual
 * result as the inline-style version, cleaner structure.
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
    <div className="min-h-screen w-full flex items-center justify-center bg-background font-sans">
      <div
        className="flex flex-col items-center gap-6
                   px-14 py-12 rounded-section bg-surface
                   shadow-subtle"
      >
        {/* Logo / app name */}
        <div className="text-lg font-semibold text-text tracking-tight">
          {appName}
        </div>

        {/* Gradient ring loader */}
        <GradientRingLoader />

        {/* Subtext */}
        <div className="text-sm font-medium text-text-muted">{message}</div>
      </div>
    </div>
  );
}
