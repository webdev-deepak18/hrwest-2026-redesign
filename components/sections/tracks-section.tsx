'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────────
   Types
   ───────────────────────────────────────────── */
interface Track {
  id: string;
  number: string;
  title: string;
  tileDescription: string;
  modalIntro: string;
  bulletPoints: string[];
  image: string;
}

/* ─────────────────────────────────────────────
   Track data
   ───────────────────────────────────────────── */
const TRACKS: Track[] = [
  {
    id: 'hr-tech',
    number: '01',
    title: 'HR Tech',
    tileDescription: 'Explore the technologies transforming modern HR.',
    modalIntro:
      "Technology's importance for HR is rapidly increasing, especially with the rise of Generative AI and automation tools. This track helps you understand what to adopt, how to implement it, and how to create real impact.",
    bulletPoints: [
      'Generative AI in HR workflows',
      'HR automation & digital transformation',
      'HR analytics and data-driven decisions',
      'Practical tech implementation strategies',
      'Improving day-to-day HR performance',
    ],
    image: '/tracks/track-hr-tech.png',
  },
  {
    id: 'hr-strategy',
    number: '02',
    title: 'HR Strategy / AI',
    tileDescription: 'Build smarter HR strategies powered by AI and data.',
    modalIntro:
      'HR leaders must adapt new strategies and refine existing ones to meet changing demands. This track delivers actionable insights to help you plan, develop, and implement smarter HR initiatives.',
    bulletPoints: [
      'AI-driven strategic planning',
      'Workforce forecasting',
      'Organizational design evolution',
      'Aligning HR with business outcomes',
      'Future-proofing your HR strategy',
    ],
    image: '/tracks/track-hr-strategy.png',
  },
  {
    id: 'talent',
    number: '03',
    title: 'Talent',
    tileDescription: 'Master talent acquisition, retention, and engagement.',
    modalIntro:
      'This track covers everything from attracting top talent to developing HR skills and strengthening company culture. It equips you to compete for talent in 2026 and beyond.',
    bulletPoints: [
      'Talent acquisition strategies',
      'Retention and engagement',
      'Employer branding',
      'Talent management systems',
      'HR career growth and development',
    ],
    image: '/tracks/track-talent.png',
  },
  {
    id: 'legal-compliance',
    number: '04',
    title: 'Legal and Compliance',
    tileDescription: 'Stay compliant in a rapidly evolving regulatory landscape.',
    modalIntro:
      'Employment attorneys and experts share critical compliance insights and updates to help you navigate complex laws and regulations with confidence.',
    bulletPoints: [
      'Employment law updates',
      'Risk mitigation strategies',
      'Workplace investigations',
      'Compliance best practices',
      'Managing legal risk in HR',
    ],
    image: '/tracks/track-legal-compliance.png',
  },
  {
    id: 'health-wellness',
    number: '05',
    title: 'Health, Wellness, Benefits',
    tileDescription: "Design modern benefits that support today's workforce.",
    modalIntro:
      'Learn how to plan for a healthier and more productive workforce. This track explores benefits innovation and holistic wellness strategies.',
    bulletPoints: [
      'Benefits modernization',
      'Mental health initiatives',
      'Wellness program design',
      'Flexible benefits structures',
      'Employee well-being strategies',
    ],
    image: '/tracks/track-health-wellness.png',
  },
  {
    id: 'leadership',
    number: '06',
    title: 'Leadership',
    tileDescription: 'Develop leaders who drive results and culture.',
    modalIntro:
      "Explore what effective leadership looks like in today's HR and broader organizational landscape. Learn how HR can help shape leaders who deliver impact.",
    bulletPoints: [
      'Leadership development programs',
      'Executive coaching strategies',
      'Culture-driven leadership',
      'Driving performance through leadership',
      "HR's role in leadership evolution",
    ],
    image: '/tracks/track-leadership.png',
  },
];

/* ─────────────────────────────────────────────
   Modal Component
   ───────────────────────────────────────────── */
interface TrackModalProps {
  trackIndex: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function TrackModal({ trackIndex, onClose, onPrev, onNext }: TrackModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  // Track the content key to trigger cross-fade on navigation
  const [contentKey, setContentKey] = useState(0);
  const [contentFading, setContentFading] = useState(false);

  const isOpen = trackIndex !== null;
  const track = isOpen ? TRACKS[trackIndex] : null;

  // Animate overlay in on first open
  useEffect(() => {
    if (isOpen) {
      const t = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(t);
    }
  }, [isOpen]);

  // Cross-fade content when trackIndex changes (after already open)
  const prevIndexRef = useRef<number | null>(null);
  useEffect(() => {
    if (isOpen && prevIndexRef.current !== null && prevIndexRef.current !== trackIndex) {
      setContentFading(true);
      const t = setTimeout(() => {
        setContentKey((k) => k + 1);
        setContentFading(false);
      }, 200);
      return () => clearTimeout(t);
    }
    prevIndexRef.current = trackIndex;
  }, [trackIndex, isOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  });

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 320);
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) handleClose();
  };

  if (!isOpen || !track) return null;

  const isFirst = trackIndex === 0;
  const isLast = trackIndex === TRACKS.length - 1;

  return (
    <div
      ref={overlayRef}
      className="ts-modal-overlay"
      data-visible={visible}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={track.title}
    >
      {/* Prev arrow — outside panel on the left */}
      <button
        className="ts-modal-nav ts-modal-nav--prev"
        onClick={onPrev}
        disabled={isFirst}
        aria-label="Previous track"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M12 4l-6 6 6 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="ts-modal-panel" data-visible={visible}>
        {/* Close button */}
        <button
          className="ts-modal-close"
          onClick={handleClose}
          aria-label="Close modal"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <line x1="4" y1="4" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="16" y1="4" x2="4" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Header image strip — swaps with cross-fade */}
        <div
          key={`img-${contentKey}`}
          className="ts-modal-image"
          style={{ backgroundImage: `url(${track.image})` }}
          data-fading={contentFading}
          aria-hidden="true"
        >
          <div className="ts-modal-image-overlay" />
          <div className="ts-modal-track-number">{track.number} / 0{TRACKS.length}</div>
        </div>

        {/* Content — cross-fades on navigation */}
        <div
          key={`body-${contentKey}`}
          className="ts-modal-body"
          data-fading={contentFading}
        >
          <h2 className="ts-modal-title">{track.title}</h2>
          <p className="ts-modal-intro">{track.modalIntro}</p>

          <ul className="ts-modal-bullets" role="list">
            {track.bulletPoints.map((point) => (
              <li key={point} className="ts-modal-bullet">
                <span className="ts-bullet-dot" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer nav bar */}
        <div className="ts-modal-footer">
          {/* Dot indicators */}
          <div className="ts-modal-dots" role="tablist" aria-label="Track navigation">
            {TRACKS.map((t, i) => (
              <button
                key={t.id}
                className="ts-modal-dot"
                data-active={i === trackIndex}
                onClick={() => {
                  if (i < trackIndex) for (let x = 0; x < trackIndex - i; x++) onPrev();
                  else for (let x = 0; x < i - trackIndex; x++) onNext();
                }}
                aria-label={`Go to ${t.title}`}
                role="tab"
                aria-selected={i === trackIndex}
              />
            ))}
          </div>

          {/* Prev / Next text buttons */}
          <div className="ts-modal-footer-nav">
            <button
              className="ts-footer-nav-btn"
              onClick={onPrev}
              disabled={isFirst}
              aria-label="Previous track"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Prev
            </button>
            <button
              className="ts-footer-nav-btn"
              onClick={onNext}
              disabled={isLast}
              aria-label="Next track"
            >
              Next
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Next arrow — outside panel on the right */}
      <button
        className="ts-modal-nav ts-modal-nav--next"
        onClick={onNext}
        disabled={isLast}
        aria-label="Next track"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M8 4l6 6-6 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Track Tile
   ───────────────────────────────────────────── */
interface TrackTileProps {
  track: Track;
  onClick: (track: Track) => void;
}

function TrackTile({ track, onClick }: TrackTileProps) {
  return (
    <button
      className="ts-tile"
      onClick={() => onClick(track)}
      aria-label={`Learn more about ${track.title}`}
      style={{ backgroundImage: `url(${track.image})` }}
    >
      {/* Dark overlay */}
      <div className="ts-tile-overlay" aria-hidden="true" />

      {/* Content */}
      <div className="ts-tile-content">
        <span className="ts-tile-number">{track.number}</span>
        <h3 className="ts-tile-title">{track.title}</h3>
        <p className="ts-tile-desc">{track.tileDescription}</p>
        <span className="ts-tile-cta" aria-hidden="true">
          Learn more
          <svg className="ts-cta-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </button>
  );
}

/* ─────────────────────────────────────────────
   Main Section
   ───────────────────────────────────────────── */
export function TracksSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openModal = useCallback((track: Track) => {
    const idx = TRACKS.findIndex((t) => t.id === track.id);
    setActiveIndex(idx);
  }, []);

  const closeModal = useCallback(() => setActiveIndex(null), []);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i !== null ? Math.min(i + 1, TRACKS.length - 1) : null));
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i !== null ? Math.max(i - 1, 0) : null));
  }, []);

  return (
    <>
      <section id="tracks" className="ts-section" aria-label="Conference tracks">
        {/* Background */}
        <div className="ts-bg" aria-hidden="true" />

        {/* Section header */}
        <div className="ts-header">
          <p className="ts-eyebrow">The Program</p>
          <h2 className="ts-heading">
            Tracks Covering <span className="ts-heading-accent">ALL</span> the Big HR Issues in 2026
          </h2>
          <p className="ts-subheading">
            Explore focused tracks designed to help you tackle today&rsquo;s biggest HR challenges
            — from AI and strategy to leadership and compliance.
          </p>
        </div>

        {/* Grid */}
        <div className="ts-grid" role="list">
          {TRACKS.map((track) => (
            <div key={track.id} role="listitem">
              <TrackTile track={track} onClick={openModal} />
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      <TrackModal
        trackIndex={activeIndex}
        onClose={closeModal}
        onPrev={goPrev}
        onNext={goNext}
      />

      {/* Component-scoped styles */}
      <style>{`
        /* ─── Section shell ─── */
        .ts-section {
          position: relative;
          background: #060010;
          padding: 7rem 2rem 8rem;
          overflow: hidden;
        }

        /* ─── Background atmosphere ─── */
        .ts-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139,92,246,0.07) 0%, transparent 65%),
            radial-gradient(ellipse 60% 40% at 50% 100%, rgba(109,40,217,0.05) 0%, transparent 70%);
          pointer-events: none;
        }

        /* ─── Header ─── */
        .ts-header {
          position: relative;
          z-index: 1;
          text-align: center;
          max-width: 780px;
          margin: 0 auto 4.5rem;
        }

        .ts-eyebrow {
          font-family: Inter, sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #8b5cf6;
          margin: 0 0 1.25rem;
        }

        .ts-heading {
          font-family: Outfit, sans-serif;
          font-size: clamp(2rem, 4.5vw, 3.2rem);
          font-weight: 900;
          letter-spacing: -0.025em;
          line-height: 1.1;
          color: #ffffff;
          margin: 0 0 1.5rem;
        }

        .ts-heading-accent {
          background: linear-gradient(135deg, #a78bfa 0%, #8b5cf6 50%, #c084fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .ts-subheading {
          font-family: Inter, sans-serif;
          font-size: clamp(0.95rem, 1.5vw, 1.1rem);
          font-weight: 400;
          line-height: 1.7;
          color: rgba(255,255,255,0.52);
          margin: 0;
        }

        /* ─── Grid ─── */
        .ts-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          max-width: 1280px;
          margin: 0 auto;
        }

        /* ─── Tile ─── */
        .ts-tile {
          position: relative;
          display: block;
          width: 100%;
          aspect-ratio: 4/3;
          background-size: cover;
          background-position: center;
          border-radius: 1rem;
          overflow: hidden;
          cursor: pointer;
          border: 1px solid rgba(45,26,74,0.6);
          transition:
            transform 0.38s cubic-bezier(0.23, 1, 0.32, 1),
            box-shadow 0.38s cubic-bezier(0.23, 1, 0.32, 1),
            border-color 0.38s ease;
          text-align: left;
          padding: 0;
          appearance: none;
          -webkit-appearance: none;
          background-color: #0f0720;
        }

        .ts-tile:hover {
          transform: translateY(-6px) scale(1.01);
          box-shadow:
            0 20px 60px rgba(0,0,0,0.55),
            0 0 0 1px rgba(139,92,246,0.25),
            0 0 40px rgba(139,92,246,0.12);
          border-color: rgba(139,92,246,0.35);
        }

        .ts-tile:focus-visible {
          outline: 2px solid #8b5cf6;
          outline-offset: 3px;
        }

        /* ─── Tile overlay ─── */
        .ts-tile-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              to top,
              rgba(6,0,16,0.92) 0%,
              rgba(6,0,16,0.60) 45%,
              rgba(6,0,16,0.18) 100%
            );
          transition: background 0.38s ease;
        }

        .ts-tile:hover .ts-tile-overlay {
          background:
            linear-gradient(
              to top,
              rgba(6,0,16,0.85) 0%,
              rgba(6,0,16,0.48) 45%,
              rgba(6,0,16,0.08) 100%
            );
        }

        /* ─── Tile content ─── */
        .ts-tile-content {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 1.75rem;
          gap: 0.35rem;
        }

        .ts-tile-number {
          font-family: Outfit, sans-serif;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: #8b5cf6;
          text-transform: uppercase;
          display: block;
          margin-bottom: 0.15rem;
        }

        .ts-tile-title {
          font-family: Outfit, sans-serif;
          font-size: clamp(1.1rem, 1.8vw, 1.45rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          color: #ffffff;
          margin: 0;
          line-height: 1.15;
        }

        .ts-tile-desc {
          font-family: Inter, sans-serif;
          font-size: clamp(0.78rem, 1.1vw, 0.88rem);
          font-weight: 400;
          color: rgba(255,255,255,0.62);
          margin: 0;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .ts-tile-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: Inter, sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: rgba(167,139,250,0);
          padding-top: 0.5rem;
          transition:
            color 0.32s ease,
            gap 0.32s ease;
        }

        .ts-cta-arrow {
          transition: transform 0.32s ease;
        }

        .ts-tile:hover .ts-tile-cta {
          color: rgba(167,139,250,0.9);
          gap: 0.6rem;
        }

        .ts-tile:hover .ts-cta-arrow {
          transform: translateX(3px);
        }

        /* ══════════ MODAL ══════════ */

        /* ─── Overlay ─── */
        .ts-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 9000;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          padding: 1.5rem;
          background: rgba(6,0,16,0);
          backdrop-filter: blur(0px);
          -webkit-backdrop-filter: blur(0px);
          transition:
            background 0.32s ease,
            backdrop-filter 0.32s ease;
          overflow-y: auto;
        }

        .ts-modal-overlay[data-visible="true"] {
          background: rgba(6,0,16,0.82);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }

        /* ─── Floating prev/next arrows OUTSIDE the panel ─── */
        .ts-modal-nav {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          background: rgba(15,7,32,0.7);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(139,92,246,0.22);
          color: rgba(255,255,255,0.55);
          cursor: pointer;
          transition:
            color 0.22s ease,
            background 0.22s ease,
            border-color 0.22s ease,
            transform 0.22s ease,
            opacity 0.22s ease;
          padding: 0;
          appearance: none;
          -webkit-appearance: none;
        }

        .ts-modal-nav:hover:not(:disabled) {
          color: #ffffff;
          background: rgba(139,92,246,0.22);
          border-color: rgba(139,92,246,0.45);
          transform: scale(1.08);
        }

        .ts-modal-nav:disabled {
          opacity: 0.2;
          cursor: default;
        }

        .ts-modal-nav:focus-visible {
          outline: 2px solid #8b5cf6;
          outline-offset: 2px;
        }

        /* ─── Panel ─── */
        .ts-modal-panel {
          position: relative;
          width: 100%;
          max-width: 620px;
          background: rgba(15,7,32,0.78);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          border: 1px solid rgba(139,92,246,0.2);
          border-radius: 1.25rem;
          overflow: hidden;
          box-shadow:
            0 40px 80px rgba(0,0,0,0.6),
            0 0 0 1px rgba(139,92,246,0.08),
            inset 0 1px 0 rgba(255,255,255,0.04);
          transform: translateY(28px) scale(0.96);
          opacity: 0;
          transition:
            transform 0.36s cubic-bezier(0.23, 1, 0.32, 1),
            opacity 0.32s ease;
        }

        .ts-modal-panel[data-visible="true"] {
          transform: translateY(0) scale(1);
          opacity: 1;
        }

        /* ─── Close button ─── */
        .ts-modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.25rem;
          height: 2.25rem;
          border-radius: 50%;
          background: rgba(15,7,32,0.7);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(139,92,246,0.18);
          color: rgba(255,255,255,0.65);
          cursor: pointer;
          transition:
            color 0.2s ease,
            background 0.2s ease,
            border-color 0.2s ease;
          padding: 0;
          appearance: none;
          -webkit-appearance: none;
        }

        .ts-modal-close:hover {
          color: #ffffff;
          background: rgba(139,92,246,0.2);
          border-color: rgba(139,92,246,0.4);
        }

        .ts-modal-close:focus-visible {
          outline: 2px solid #8b5cf6;
          outline-offset: 2px;
        }

        /* ─── Image strip ─── */
        .ts-modal-image {
          position: relative;
          width: 100%;
          height: 220px;
          background-size: cover;
          background-position: center;
          flex-shrink: 0;
          transition: opacity 0.2s ease;
        }

        .ts-modal-image[data-fading="true"] {
          opacity: 0;
        }

        .ts-modal-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(6,0,16,0.2) 0%,
            rgba(6,0,16,0.65) 100%
          );
        }

        .ts-modal-track-number {
          position: absolute;
          bottom: 1.25rem;
          left: 1.75rem;
          font-family: Outfit, sans-serif;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: #a78bfa;
          text-transform: uppercase;
        }

        /* ─── Modal body ─── */
        .ts-modal-body {
          padding: 2rem 2rem 1.5rem;
          transition: opacity 0.2s ease;
        }

        .ts-modal-body[data-fading="true"] {
          opacity: 0;
        }

        .ts-modal-title {
          font-family: Outfit, sans-serif;
          font-size: clamp(1.6rem, 3vw, 2rem);
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1.1;
          color: #ffffff;
          margin: 0 0 1.1rem;
        }

        .ts-modal-intro {
          font-family: Inter, sans-serif;
          font-size: 0.925rem;
          font-weight: 400;
          line-height: 1.7;
          color: rgba(255,255,255,0.62);
          margin: 0 0 1.75rem;
        }

        /* ─── Bullets ─── */
        .ts-modal-bullets {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
          border-top: 1px solid rgba(45,26,74,0.6);
          padding-top: 1.5rem;
        }

        .ts-modal-bullet {
          display: flex;
          align-items: center;
          gap: 0.9rem;
          font-family: Inter, sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          color: rgba(255,255,255,0.82);
          line-height: 1.5;
        }

        .ts-bullet-dot {
          flex-shrink: 0;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #8b5cf6;
          box-shadow: 0 0 8px rgba(139,92,246,0.7);
        }

        /* ─── Modal footer nav bar ─── */
        .ts-modal-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 2rem 1.5rem;
          border-top: 1px solid rgba(45,26,74,0.5);
          margin-top: 0.25rem;
        }

        /* dot indicators */
        .ts-modal-dots {
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }

        .ts-modal-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          border: none;
          padding: 0;
          cursor: pointer;
          background: rgba(139,92,246,0.22);
          transition:
            background 0.22s ease,
            transform 0.22s ease,
            width 0.3s ease;
          appearance: none;
          -webkit-appearance: none;
        }

        .ts-modal-dot[data-active="true"] {
          background: #8b5cf6;
          box-shadow: 0 0 8px rgba(139,92,246,0.65);
          width: 18px;
          border-radius: 3px;
          transform: scale(1);
        }

        .ts-modal-dot:hover:not([data-active="true"]) {
          background: rgba(139,92,246,0.5);
          transform: scale(1.3);
        }

        .ts-modal-dot:focus-visible {
          outline: 2px solid #8b5cf6;
          outline-offset: 2px;
        }

        /* prev/next text buttons in footer */
        .ts-modal-footer-nav {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .ts-footer-nav-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: Inter, sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: rgba(255,255,255,0.4);
          padding: 0.45rem 0.8rem;
          border-radius: 6px;
          border: 1px solid transparent;
          background: transparent;
          cursor: pointer;
          transition:
            color 0.2s ease,
            background 0.2s ease,
            border-color 0.2s ease;
          appearance: none;
          -webkit-appearance: none;
        }

        .ts-footer-nav-btn:hover:not(:disabled) {
          color: #a78bfa;
          background: rgba(139,92,246,0.1);
          border-color: rgba(139,92,246,0.2);
        }

        .ts-footer-nav-btn:disabled {
          opacity: 0.25;
          cursor: default;
        }

        .ts-footer-nav-btn:focus-visible {
          outline: 2px solid #8b5cf6;
          outline-offset: 2px;
        }

        /* ══════════ RESPONSIVE ══════════ */

        @media (max-width: 1024px) {
          .ts-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* On narrower screens, hide side arrows and rely on footer nav */
        @media (max-width: 860px) {
          .ts-modal-nav {
            display: none;
          }

          .ts-modal-overlay {
            padding: 1rem;
          }
        }

        @media (max-width: 640px) {
          .ts-section {
            padding: 5rem 1.25rem 6rem;
          }

          .ts-header {
            margin-bottom: 3rem;
          }

          .ts-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .ts-tile {
            aspect-ratio: 16/9;
          }

          .ts-modal-panel {
            max-width: 100%;
          }

          .ts-modal-image {
            height: 160px;
          }

          .ts-modal-body {
            padding: 1.5rem 1.5rem 1.25rem;
          }

          .ts-modal-footer {
            padding: 1rem 1.5rem 1.25rem;
          }
        }
      `}</style>
    </>
  );
}
