const included = [
  "Full terminal emulator (PTY-backed, all platforms)",
  "Unlimited views & dockable widgets",
  "AI Workflow Pipeline (Claude Code & Copilot)",
  "Automatic AI tool detection & status badge",
  "File browser widget",
  "In-app auto-update",
  "Linux (AppImage + tar.gz) and Windows builds",
  "All future updates included",
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6">
      {/* Divider */}
      <div className="max-w-6xl mx-auto mb-16">
        <div className="h-px" style={{ background: "var(--color-border)" }} />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--color-accent)" }}>
            Pricing
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight"
            style={{ color: "var(--color-foreground)" }}
          >
            Simple, honest pricing
          </h2>
          <p className="mt-4 text-base" style={{ color: "var(--color-muted)" }}>
            One plan. Everything included. Pay once, own it.
          </p>
        </div>

        {/* Pricing card */}
        <div className="flex justify-center">
          <div
            className="w-full max-w-md rounded-2xl border overflow-hidden"
            style={{
              background: "var(--color-surface)",
              borderColor: "var(--color-accent)",
              boxShadow: "0 0 0 1px rgba(224,112,64,0.15), 0 20px 60px rgba(224,112,64,0.08)",
            }}
          >
            {/* Card header */}
            <div
              className="px-8 pt-8 pb-6 border-b"
              style={{ borderColor: "var(--color-border)" }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-widest mb-1"
                    style={{ color: "var(--color-accent)" }}
                  >
                    Pro
                  </p>
                  <p className="text-sm" style={{ color: "var(--color-muted)" }}>
                    Full access, every feature
                  </p>
                </div>
                <span
                  className="text-xs px-2.5 py-1 rounded-full font-medium"
                  style={{ background: "var(--color-accent-dim)", color: "var(--color-accent)" }}
                >
                  Subscription
                </span>
              </div>

              <div className="mt-6 flex items-end gap-1">
                <span
                  className="text-5xl font-bold tracking-tight"
                  style={{ color: "var(--color-foreground)" }}
                >
                  €8
                </span>
                <span className="text-base mb-1.5" style={{ color: "var(--color-muted)" }}>
                  / month
                </span>
              </div>
            </div>

            {/* Features list */}
            <div className="px-8 py-6">
              <ul className="space-y-3">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <svg
                      className="w-4 h-4 mt-0.5 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      style={{ color: "var(--color-accent)" }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span style={{ color: "var(--color-foreground)" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="px-8 pb-8">
              <a
                href="/download"
                className="block w-full text-center py-3 rounded-lg font-semibold text-sm transition-opacity"
                style={{ background: "var(--color-accent)", color: "#fff" }}
              >
                Download
              </a>
              <p className="mt-3 text-center text-xs" style={{ color: "var(--color-muted)" }}>
                One-time payment. No subscription.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
