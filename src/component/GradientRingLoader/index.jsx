import React from "react";

/**
 * GradientRingLoader
 * Small spinning ring loader using the design system's
 * secondary/primary gradient accents. Pure Tailwind, no custom CSS.
 */
export default function GradientRingLoader({ size = 40 }) {
  return (
    <div
      className="relative motion-reduce:animate-none"
      style={{ width: size, height: size }}
    >
      {/* static track */}
      <div className="absolute inset-0 rounded-full border-[3px] border-[#EDE9FE]" />

      {/* animated gradient arc */}
      <div
        className="absolute inset-0 rounded-full border-[3px] border-transparent
                   border-t-[#8B5CF6] border-r-[#437FF7]
                   animate-spin motion-reduce:animate-none"
      />
    </div>
  );
}
