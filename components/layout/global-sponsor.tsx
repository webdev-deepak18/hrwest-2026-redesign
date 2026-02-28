"use client";

import React, { useEffect, useRef, useState } from "react";
import { sponsorLogos } from "@/components/layout/sponsor-logo";

const LOGOS = [...sponsorLogos, ...sponsorLogos]; // duplicate for infinite loop

export function GlobalSponsor() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  // Pause animation on hover
  const handleEnter = () => setPaused(true);
  const handleLeave = () => setPaused(false);

  return (
    <section
      className="gsp-section"
      aria-label="HRWest 2025 Conference Sponsors"
    >
      {/* ── Eyebrow title ── */}
      <div className="gsp-header">
        <span className="gsp-eyebrow">
          <span className="gsp-dot" aria-hidden="true" />
          HRWest 2025 Conference Sponsors
        </span>
      </div>

      {/* ── Marquee ── */}
      <div className="gsp-viewport" aria-hidden="true">
        {/* Left fade */}
        <div className="gsp-fade gsp-fade-left" />
        {/* Right fade */}
        <div className="gsp-fade gsp-fade-right" />

        <div
          ref={trackRef}
          className={`gsp-track${paused ? " gsp-track--paused" : ""}`}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          {LOGOS.map((sponsor, i) => (
            <a
              key={`${i}-${sponsor.alt}`}
              href={sponsor.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`Visit sponsor: ${sponsor.alt}`}
              className="gsp-card-link"
            >
              <div className="gsp-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={sponsor.src}
                  alt={sponsor.alt}
                  className="gsp-logo"
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
              </div>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        /* ── Section ── */
        .gsp-section {
          width: 100%;
          background: #060010;
          border-top: 1px solid rgba(139, 92, 246, 0.22);
          border-bottom: 1px solid rgba(139, 92, 246, 0.14);
          padding: 28px 0 32px;
          overflow: hidden;
        }

        /* ── Eyebrow ── */
        .gsp-header {
          text-align: center;
          margin-bottom: 18px;
        }
        .gsp-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border-radius: 9999px;
          border: 1px solid rgba(139, 92, 246, 0.22);
          background: rgba(139, 92, 246, 0.1);
          padding: 6px 20px;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #c4b5fd;
          white-space: nowrap;
        }
        .gsp-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #a78bfa;
          flex-shrink: 0;
          animation: gspPulse 2s ease-in-out infinite;
        }
        @keyframes gspPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.35; transform: scale(0.7); }
        }

        /* ── Viewport (clips overflow, holds fade overlays) ── */
        .gsp-viewport {
          position: relative;
          width: 100%;
          overflow: hidden;
          padding: 8px 0;
        }

        /* Edge fades */
        .gsp-fade {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 100px;
          z-index: 2;
          pointer-events: none;
        }
        .gsp-fade-left  { left: 0;  background: linear-gradient(to right, #060010 0%, transparent 100%); }
        .gsp-fade-right { right: 0; background: linear-gradient(to left, #060010 0%, transparent 100%); }

        /* ── Scrolling track ── */
        .gsp-track {
          display: flex;
          align-items: center;
          gap: 24px;
          width: max-content;
          animation: gspScroll 28s linear infinite;
        }
        .gsp-track--paused {
          animation-play-state: paused;
        }
        @keyframes gspScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* ── Card link ── */
        .gsp-card-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          outline: none;
          border-radius: 10px;
          flex-shrink: 0;
        }

        /* ── White card: FIXED 160×76 — immune to image intrinsic size ── */
        .gsp-card {
          /* Fixed. Non-negotiable. Overflow handles the rest. */
          width: 160px;
          height: 76px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px 16px;
          box-sizing: border-box;
          background: #ffffff;
          border-radius: 10px;
          border: 1px solid rgba(139, 92, 246, 0.15);
          overflow: hidden;
          flex-shrink: 0;
          /* Permanent subtle glow via box-shadow (not clipped by overflow) */
          box-shadow:
            0 2px 10px rgba(0, 0, 0, 0.35),
            0 0 18px rgba(139, 92, 246, 0.14);
          transition:
            box-shadow 0.28s ease,
            border-color 0.28s ease,
            transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform, box-shadow;
        }

        /* Hover: strong purple glow + scale */
        .gsp-card-link:hover .gsp-card {
          transform: scale(1.04);
          border-color: rgba(139, 92, 246, 0.4);
          box-shadow:
            0 4px 16px rgba(0, 0, 0, 0.4),
            0 0 0 1.5px rgba(139, 92, 246, 0.38),
            0 0 30px rgba(139, 92, 246, 0.32),
            0 0 55px rgba(139, 92, 246, 0.16);
        }

        /* Keyboard focus ring */
        .gsp-card-link:focus-visible .gsp-card {
          box-shadow:
            0 0 0 3px rgba(139, 92, 246, 0.6),
            0 0 24px rgba(139, 92, 246, 0.28),
            0 2px 8px rgba(0, 0, 0, 0.35);
        }

        /* ── Logo image ── */
        .gsp-logo {
          /* 
           * Direct height + max-height: 44px — both set so the computed 
           * height is always exactly 44px regardless of the image's 
           * intrinsic dimensions. width:auto maintains aspect ratio.
           * The card's overflow:hidden clips anything that still exceeds.
           */
          display: block;
          height: 44px;
          width: auto;
          max-width: 120px;
          max-height: 44px;
          object-fit: contain;
          pointer-events: none;
          user-select: none;
          -webkit-user-drag: none;
          flex-shrink: 0;
        }

        /* ── Mobile ── */
        @media (max-width: 640px) {
          .gsp-track { gap: 16px; }
          .gsp-card {
            width: 130px;
            height: 64px;
            padding: 8px 12px;
          }
          .gsp-logo {
            height: 36px;
            max-height: 36px;
            max-width: 98px;
          }
          .gsp-fade { width: 48px; }
        }
      `}</style>
    </section>
  );
}

export default GlobalSponsor;
