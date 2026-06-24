"use client";

import Image from "next/image";
import { useState } from "react";

const screenshots = [
  {
    src: "/screenshots/multiple_views.png",
    alt: "AR Workspace — multiple named views with docked panels",
  },
  {
    src: "/screenshots/three_terminals.png",
    alt: "AR Workspace — three terminal panes open",
  },
  {
    src: "/screenshots/initial_state.png",
    alt: "AR Workspace — initial empty state",
  },
];

const stackSlots = [
  { zIndex: 3, transform: "rotate(0deg) translate(0%, 0%)",      shadow: "0 25px 80px rgba(0,0,0,0.6)" },
  { zIndex: 2, transform: "rotate(2deg) translate(1.5%, 1%)",    shadow: "0 15px 55px rgba(0,0,0,0.55)" },
  { zIndex: 1, transform: "rotate(-4deg) translate(-2.5%, 2%)",  shadow: "0 10px 40px rgba(0,0,0,0.5)" },
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const n = screenshots.length;

  const prev = () => setActiveIndex((i) => (i - 1 + n) % n);
  const next = () => setActiveIndex((i) => (i + 1) % n);

  return (
    <section className="relative pt-32 pb-24 px-6 overflow-hidden">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% -10%, rgba(224,112,64,0.10) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <span
            className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full border"
            style={{
              color: "var(--color-accent)",
              borderColor: "rgba(224,112,64,0.3)",
              background: "rgba(224,112,64,0.08)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            Available for Linux, Windows &amp; macOS
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-center font-bold text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight max-w-4xl mx-auto"
          style={{ color: "var(--color-foreground)" }}
        >
          One workspace.
          <br />
          <span style={{ color: "var(--color-accent)" }}>Every platform.</span>
        </h1>

        <p
          className="mt-6 text-center text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          style={{ color: "var(--color-muted)" }}
        >
          Organize terminals, panels, and AI tools the same way on Linux, Windows, and macOS —
          same shortcuts, same layout, zero relearning.
        </p>

        {/* Trust pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {[
            "No installation — extract and run",
            "Fully keyboard-driven",
            "Linux · Windows · macOS",
          ].map((pill) => (
            <span
              key={pill}
              className="inline-flex items-center gap-1.5 text-xs"
              style={{ color: "var(--color-muted)" }}
            >
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "var(--color-accent)" }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              {pill}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://github.com/AleksaRistic216/ar-workspace-release"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg font-medium text-sm transition-opacity"
            style={{ background: "var(--color-accent)", color: "#fff" }}
          >
            Download Now
          </a>
          <a
            href="#features"
            className="px-6 py-3 rounded-lg font-medium text-sm border transition-colors"
            style={{
              color: "var(--color-foreground)",
              borderColor: "var(--color-border)",
              background: "var(--color-surface)",
            }}
          >
            See Features
          </a>
        </div>

        {/* App screenshots — navigable stack */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="relative" style={{ paddingBottom: "56.2%" /* 816/1456 */ }}>
            {screenshots.map((shot, imgIndex) => {
              const slot = (imgIndex - activeIndex + n) % n;
              const { zIndex, transform, shadow } = stackSlots[slot];
              return (
                <div
                  key={shot.src}
                  className="absolute inset-0 rounded-xl border overflow-hidden"
                  style={{
                    zIndex,
                    transform,
                    boxShadow: shadow,
                    borderColor: "var(--color-border)",
                    transition: "transform 0.4s ease, box-shadow 0.4s ease",
                  }}
                >
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    width={1456}
                    height={816}
                    className="w-full h-auto block"
                    priority={imgIndex === activeIndex}
                  />
                </div>
              );
            })}

            {/* Arrow controls — bottom overlay */}
            <div
              className="absolute bottom-4 left-1/2 flex items-center gap-3"
              style={{ transform: "translateX(-50%)", zIndex: 10 }}
            >
              {[{ label: "Previous screenshot", handler: prev, glyph: "‹" },
                { label: "Next screenshot",     handler: next, glyph: "›" }].map(({ label, handler, glyph }) => (
                <button
                  key={label}
                  onClick={handler}
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded-full border text-base font-medium cursor-pointer select-none"
                  style={{
                    background: "var(--color-surface-2)",
                    borderColor: "var(--color-border)",
                    color: "var(--color-foreground)",
                    transition: "background 0.15s, border-color 0.15s, color 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--color-accent)";
                    e.currentTarget.style.borderColor = "var(--color-accent)";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "var(--color-surface-2)";
                    e.currentTarget.style.borderColor = "var(--color-border)";
                    e.currentTarget.style.color = "var(--color-foreground)";
                  }}
                >
                  {glyph}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
