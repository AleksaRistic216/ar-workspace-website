const pillars = [
  {
    heading: "One workspace.",
    body: "Every tool you need — terminals, panels, AI — in a single organized window.",
  },
  {
    heading: "Every platform.",
    body: "Linux, Windows, macOS. Same layout, same shortcuts, zero relearning.",
  },
  {
    heading: "Terminal that just works.",
    body: "Full VT support, tabbed sessions, scrollback. No setup, no quirks.",
  },
  {
    heading: "1-day bugfix.",
    body: "Report a bug or request a feature — we will have it implemented within a day.",
  },
];

export default function Pillars() {
  return (
    <section className="py-16 px-6 border-t" style={{ borderColor: "var(--color-border)" }}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {pillars.map((p) => (
          <div key={p.heading} className="flex flex-col gap-2">
            <h2
              className="text-xl font-bold tracking-tight"
              style={{ color: "var(--color-accent)" }}
            >
              {p.heading}
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
              {p.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
