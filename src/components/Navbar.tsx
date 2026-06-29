"use client";

import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{
        background: "rgba(12, 12, 15, 0.85)",
        backdropFilter: "blur(12px)",
        borderColor: "var(--color-border)",
      }}
    >
      <nav className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 font-semibold text-[15px]">
          <Image src="/icon.png" alt="CPT" width={28} height={28} className="rounded" />
          <span style={{ color: "var(--color-foreground)" }}>Cross Platform Terminal</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {[
            { label: "Features", href: "#features" },
            { label: "Cross-Platform", href: "#cross-platform" },
            { label: "Pricing", href: "#pricing" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-sm transition-colors"
              style={{ color: "var(--color-muted)" }}
              onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "var(--color-foreground)")}
              onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "var(--color-muted)")}
            >
              {label}
            </a>
          ))}
          <a
            href="/download"
            className="text-sm px-4 py-1.5 rounded-md transition-opacity"
            style={{ background: "var(--color-accent)", color: "#fff" }}
            onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.opacity = "0.85")}
            onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.opacity = "1")}
          >
            Get Started
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded"
          style={{ color: "var(--color-muted)" }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t px-6 py-4 flex flex-col gap-4" style={{ borderColor: "var(--color-border)", background: "var(--color-background)" }}>
          {[
            { label: "Features", href: "#features" },
            { label: "Cross-Platform", href: "#cross-platform" },
            { label: "Pricing", href: "#pricing" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-sm"
              style={{ color: "var(--color-muted)" }}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <a
            href="/download"
            className="text-sm px-4 py-2 rounded-md text-center"
            style={{ background: "var(--color-accent)", color: "#fff" }}
          >
            Get Started
          </a>
        </div>
      )}
    </header>
  );
}
