import React from "react";
import GradientRingLoader from "../../component/GradientRingLoader";

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
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f3f4f6] font-sans">
      <div
        className="flex flex-col items-center gap-6
                   px-14 py-12 rounded-[20px] bg-white
                   shadow-[0_2px_8px_rgba(0,0,0,0.05)]"
      >
        {/* Logo / app name */}
        <div className="text-lg font-semibold text-[#111827] tracking-tight">
          {appName}
        </div>

        {/* Gradient ring loader */}
        <GradientRingLoader />

        {/* Subtext */}
        <div className="text-sm font-medium text-[#9CA3AF]">{message}</div>
      </div>
    </div>
  );
}
