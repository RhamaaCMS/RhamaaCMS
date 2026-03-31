import React from "react";
import { cn } from "@/lib/utils";

export function BackgroundBeams({ className }: { className?: string }) {
  const beams = [
    { top: "14%", left: "25%", delay: "0s", duration: "7s" },
    { top: "62%", left: "75%", delay: "2s", duration: "9s" },
    { top: "38%", left: "55%", delay: "4s", duration: "6s" },
    { top: "82%", left: "15%", delay: "1s", duration: "8s" },
    { top: "22%", left: "85%", delay: "3s", duration: "10s" },
  ];

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
      aria-hidden="true"
    >
      {beams.map((beam, i) => (
        <div
          key={i}
          className="absolute h-px w-[300px] origin-left"
          style={{
            top: beam.top,
            left: beam.left,
            background:
              "linear-gradient(90deg, transparent, rgba(200,169,110,0.35), transparent)",
            animationName: "beam-slide",
            animationDuration: beam.duration,
            animationDelay: beam.delay,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            transform: "rotate(-35deg)",
          }}
        />
      ))}
      <style>{`
        @keyframes beam-slide {
          0%   { opacity: 0; transform: rotate(-35deg) translateX(-100px); }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { opacity: 0; transform: rotate(-35deg) translateX(calc(100vw + 100px)); }
        }
      `}</style>
    </div>
  );
}
