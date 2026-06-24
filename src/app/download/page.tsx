"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Asset = { name: string; browser_download_url: string };

type Release = {
  version: string;
  linuxAppImage: Asset | null;
  linuxTarGz: Asset | null;
  windows: Asset | null;
};

function LinuxIcon() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.504 0c-.155 0-.315.008-.48.021C7.576.191 3.924 3.58 3.217 7.94c-.284 1.718-.143 3.331.393 4.772.08.21.156.396.217.529.054.12.098.205.126.254l.08.133a4.47 4.47 0 01.464 1.01c.093.372.078.684-.033.96-.278.693-1.184 1.28-1.888 2.063-.27.302-.5.63-.634.996-.136.368-.164.79-.054 1.222.185.723.68 1.287 1.34 1.619.659.333 1.46.43 2.218.292.759-.137 1.455-.476 1.971-.971.515-.495.857-1.152.954-1.908.118-.928-.13-1.69-.5-2.4a10.72 10.72 0 01-.37-.813c-.115-.29-.192-.553-.203-.771-.013-.248.04-.432.186-.587.296-.317.845-.488 1.415-.574.573-.087 1.19-.082 1.748-.025.558.057 1.05.18 1.374.363.327.184.486.42.444.714-.04.283-.24.59-.527.836-.284.245-.65.435-1.04.547-.39.11-.8.134-1.15.068a2.09 2.09 0 01-.857-.37.528.528 0 00-.724.137.524.524 0 00.127.726c.37.267.81.435 1.296.514.487.08 1.02.057 1.537-.083.517-.139.998-.39 1.39-.738.39-.348.683-.801.77-1.344.09-.554-.053-1.092-.39-1.54-.336-.447-.836-.787-1.432-1.01-.597-.222-1.28-.316-1.944-.332a10.57 10.57 0 00-.81.021c.098-.23.21-.477.33-.734.318-.69.702-1.44 1.015-2.206.316-.77.555-1.558.555-2.3 0-2.656-2.15-4.806-4.805-4.806z" />
    </svg>
  );
}

function WindowsIcon() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 12V6.75l6-1.32v6.57H3zM21 12v-6.75l-6-1.32v8.07H21zM3 13.5h6v6.57l-6-1.32V13.5zM15 13.5h6v5.25l-6-1.32V13.5z" />
    </svg>
  );
}

function MacIcon() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function DownloadButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-opacity"
      style={{ background: "var(--color-accent)", color: "#fff" }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
    >
      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      {label}
    </a>
  );
}

export default function DownloadPage() {
  const [release, setRelease] = useState<Release | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://api.github.com/repos/AleksaRistic216/ar-workspace-release/releases/latest")
      .then((r) => r.json())
      .then((data) => {
        const assets: Asset[] = data.assets ?? [];
        setRelease({
          version: data.tag_name,
          linuxAppImage: assets.find((a) => a.name.endsWith(".AppImage")) ?? null,
          linuxTarGz:    assets.find((a) => a.name.endsWith(".tar.gz"))   ?? null,
          windows:       assets.find((a) => a.name.endsWith(".zip"))      ?? null,
        });
      })
      .catch(() => setError(true));
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-24">
        <div className="max-w-3xl w-full mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--color-accent)" }}>
              Download
            </p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: "var(--color-foreground)" }}>
              Get AR Workspace
            </h1>
            {release && (
              <p className="mt-3 text-sm" style={{ color: "var(--color-muted)" }}>
                Latest release: <span style={{ color: "var(--color-foreground)" }}>{release.version}</span>
              </p>
            )}
            {!release && !error && (
              <p className="mt-3 text-sm" style={{ color: "var(--color-muted)" }}>
                Fetching latest release…
              </p>
            )}
            {error && (
              <p className="mt-3 text-sm" style={{ color: "var(--color-muted)" }}>
                Could not fetch release info.{" "}
                <a href="https://github.com/AleksaRistic216/ar-workspace-release/releases" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-accent)" }}>
                  View on GitHub
                </a>
              </p>
            )}
          </div>

          {/* Platform cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Linux */}
            <div
              className="rounded-xl border p-6 flex flex-col gap-4"
              style={{ background: "var(--color-surface)", borderColor: "var(--color-border)" }}
            >
              <div className="flex items-center gap-3">
                <span style={{ color: "var(--color-accent)" }}><LinuxIcon /></span>
                <span className="font-semibold text-sm" style={{ color: "var(--color-foreground)" }}>Linux</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "var(--color-muted)" }}>
                x86_64 · AppImage (run anywhere) or tar.gz (extract and run)
              </p>
              <div className="mt-auto flex flex-col gap-2">
                {release?.linuxAppImage ? (
                  <DownloadButton href={release.linuxAppImage.browser_download_url} label="AppImage" />
                ) : (
                  <div className="w-full px-4 py-2.5 rounded-lg text-sm font-medium text-center" style={{ background: "var(--color-surface-2)", color: "var(--color-muted)" }}>
                    AppImage
                  </div>
                )}
                {release?.linuxTarGz ? (
                  <DownloadButton href={release.linuxTarGz.browser_download_url} label="tar.gz" />
                ) : (
                  <div className="w-full px-4 py-2.5 rounded-lg text-sm font-medium text-center" style={{ background: "var(--color-surface-2)", color: "var(--color-muted)" }}>
                    tar.gz
                  </div>
                )}
              </div>
            </div>

            {/* Windows */}
            <div
              className="rounded-xl border p-6 flex flex-col gap-4"
              style={{ background: "var(--color-surface)", borderColor: "var(--color-border)" }}
            >
              <div className="flex items-center gap-3">
                <span style={{ color: "var(--color-accent)" }}><WindowsIcon /></span>
                <span className="font-semibold text-sm" style={{ color: "var(--color-foreground)" }}>Windows</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "var(--color-muted)" }}>
                x86_64 · ZIP archive, no installer required
              </p>
              <div className="mt-auto">
                {release?.windows ? (
                  <DownloadButton href={release.windows.browser_download_url} label=".zip" />
                ) : (
                  <div className="w-full px-4 py-2.5 rounded-lg text-sm font-medium text-center" style={{ background: "var(--color-surface-2)", color: "var(--color-muted)" }}>
                    .zip
                  </div>
                )}
              </div>
            </div>

            {/* macOS — disabled */}
            <div
              className="rounded-xl border p-6 flex flex-col gap-4 opacity-50"
              style={{ background: "var(--color-surface)", borderColor: "var(--color-border)" }}
            >
              <div className="flex items-center gap-3">
                <span style={{ color: "var(--color-muted)" }}><MacIcon /></span>
                <span className="font-semibold text-sm" style={{ color: "var(--color-foreground)" }}>macOS</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "var(--color-muted)" }}>
                Coming soon
              </p>
              <div className="mt-auto">
                <div
                  className="w-full px-4 py-2.5 rounded-lg text-sm font-medium text-center cursor-not-allowed"
                  style={{ background: "var(--color-surface-2)", color: "var(--color-muted)" }}
                >
                  Not yet available
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
