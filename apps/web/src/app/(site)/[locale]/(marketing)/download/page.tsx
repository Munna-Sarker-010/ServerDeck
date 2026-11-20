"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Download } from "lucide-react";
import { FeatureIllustration } from "@repo/ui/illustrations";
import { useCopy } from "@/i18n/use-copy";
import { usePlatform, type Platform } from "@/hooks/use-platform";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { PlatformIcon } from "@/components/platform-icon";
import "./download.css";

const DESKTOP_DETAILS: Record<Exclude<Platform, "unknown">, { title: string; variant: string; format: string }> = {
  "mac-arm": { title: "macOS", variant: "Apple Silicon", format: "DMG" },
  "mac-intel": { title: "macOS", variant: "Intel x86_64", format: "DMG" },
  windows: { title: "Windows", variant: "64-bit", format: "ZIP" },
  linux: { title: "Linux", variant: "x86_64", format: "AppImage" },
};

type Release = { version: string; sizes: Record<string, number> };

export default function DownloadPage() {
  const copy = useCopy();
  const locale = useLocale();
  const { allPlatforms, getDownloadUrl } = usePlatform();
  const [release] = useState<Release | null>({
    version: "v1.0.1",
    sizes: {
      "ServerDeck-win32-x64.zip": 128_000_000,
      "ServerDeck-arm64.dmg": 115_000_000,
      "ServerDeck-x64.dmg": 120_000_000,
      "ServerDeck.AppImage": 110_000_000,
    },
  });

  const windowsPlatforms = allPlatforms.filter((item) => item.platform === "windows");

  return (
    <>
      <Navbar />
      <main className="dl-page marketing-page">
        <section className="dl-hero hero-section" aria-labelledby="download-title">
          <div className="hero-grain absolute inset-0" aria-hidden="true" />
          <div className="hero-grid absolute inset-0" aria-hidden="true" />
          <div className="hero-aurora" aria-hidden="true">
            <div className="hero-aurora-core" />
            <div className="hero-aurora-wing hero-aurora-wing--left" />
            <div className="hero-aurora-wing hero-aurora-wing--right" />
          </div>
          <div className="site-container dl-hero-content">
            <FeatureIllustration name="dashboard-cli-desktop" className="marketing-illustration dl-hero-art" />
            <h1 id="download-title" className="dl-title">
              {copy("Install ServerDeck.")}
              <span className="hero-headline-second">{copy("Deploy in seconds.")}</span>
            </h1>
            <p className="dl-hero-description">
              {copy("Your machine, your servers, your stack. The dashboard and desktop app - all open‑source, all yours to run.")}
            </p>
            <div className="dl-hero-actions">
              <a href="/downloads/ServerDeck-win32-x64.zip" className="th-btn dl-primary">
                <PlatformIcon name="windows" className="dl-button-icon" />
                {copy("Download for Windows")}
              </a>
            </div>
            <p className="dl-release">
              <span>{copy("Free forever · Apache 2.0")}</span>
              {release?.version && <bdi>{release.version}</bdi>}
            </p>
          </div>
          <div className="hero-edge-fade-top absolute top-0 inset-x-0 h-20" aria-hidden="true" />
          <div className="hero-edge-fade-bottom absolute bottom-0 inset-x-0 h-40" aria-hidden="true" />
        </section>

        <div className="site-container">
          <section id="downloads" className="dl-downloads" aria-labelledby="desktop-title">
            <header className="dl-section-head">
              <div>
                <h2 id="desktop-title">{copy("Download for Windows")}</h2>
                <p>{copy("The desktop app for Windows.")}</p>
              </div>
            </header>
            <div className="dl-platforms">
              {windowsPlatforms.map((item) => {
                const details = DESKTOP_DETAILS.windows;
                const bytes = release?.sizes[item.fileName];
                return (
                  <article key={item.platform} className="dl-platform" data-recommended="true">
                    <div className="dl-platform-mark">
                      <PlatformIcon name={item.icon} className="dl-os-icon" />
                      <span className="dl-recommended">{copy("Recommended")}</span>
                    </div>
                    <h3>{details.title}</h3>
                    <p className="dl-platform-variant">{copy(details.variant)}</p>
                    <div className="dl-platform-meta">
                      <bdi>{details.format}</bdi>
                      {bytes && (
                        <bdi>
                          {new Intl.NumberFormat(locale, {
                            style: "unit",
                            unit: "megabyte",
                            maximumFractionDigits: 1,
                          }).format(bytes / 1_000_000)}
                        </bdi>
                      )}
                    </div>
                    <a
                      href={getDownloadUrl(item.platform)}
                      className="dl-platform-download th-btn"
                      aria-label={`${copy(item.label)} (${copy(details.variant)})`}
                    >
                      {copy("Download")} <Download size={16} aria-hidden="true" />
                    </a>
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
