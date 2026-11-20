"use client";

import { FeatureIllustration } from "@repo/ui/illustrations";
import { useCopy } from "@/i18n/use-copy";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { PlatformIcon } from "@/components/platform-icon";
import "./download.css";

export default function DownloadPage() {
  const copy = useCopy();

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
              <a href="https://github.com/Munna-Sarker-010/ServerDeck/releases/download/v1.0.0/ServerDeck.zip" className="th-btn dl-primary">
                <PlatformIcon name="windows" className="dl-button-icon" />
                {copy("Download for Windows")}
              </a>
            </div>
            <p className="dl-release">
              <span>{copy("Free forever · Apache 2.0")}</span>
              <bdi>v1.0.0</bdi>
            </p>
          </div>
          <div className="hero-edge-fade-top absolute top-0 inset-x-0 h-20" aria-hidden="true" />
          <div className="hero-edge-fade-bottom absolute bottom-0 inset-x-0 h-40" aria-hidden="true" />
        </section>
      </main>
      <Footer />
    </>
  );
}
