import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-auto border-t py-10 px-6" style={{ borderColor: "var(--color-border)" }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <Image src="/icon.png" alt="CPT" width={28} height={28} className="rounded" />
          <span className="text-sm font-semibold" style={{ color: "var(--color-foreground)" }}>
            Cross Platform Terminal
          </span>
        </div>

        <p className="text-xs" style={{ color: "var(--color-muted)" }}>
          © {new Date().getFullYear()} Cross Platform Terminal. All rights reserved.
        </p>

        <div className="flex items-center gap-5">
          <a
            href="https://github.com/AleksaRistic216/ar-workspace-release"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs transition-colors"
            style={{ color: "var(--color-muted)" }}
          >
            GitHub Releases
          </a>
          <a
            href="https://github.com/AleksaRistic216/ar-workspace-release/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs transition-colors"
            style={{ color: "var(--color-muted)" }}
          >
            Bug Reports
          </a>
        </div>
      </div>
    </footer>
  );
}
