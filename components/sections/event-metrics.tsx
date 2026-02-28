'use client';

import React, { useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────────
   Metric data — exact values as specified
   ───────────────────────────────────────────── */
interface Metric {
  /** Numeric target for the count-up */
  value: number;
  /** Symbol that follows the number, e.g. "+" */
  suffix: string;
  /** Descriptive label rendered beneath the number */
  label: string;
  /** Subtle accent glow hue for this metric */
  glowColor: string;
}

const METRICS: Metric[] = [
  { value: 700, suffix: '+', label: 'Attendees', glowColor: 'rgba(139,92,246,0.45)' },
  { value: 100, suffix: '+', label: 'Speakers', glowColor: 'rgba(167,139,250,0.40)' },
  { value: 10, suffix: '', label: 'Full HR Credits', glowColor: 'rgba(192,132,252,0.38)' },
  { value: 40, suffix: '+', label: 'Exhibitors', glowColor: 'rgba(224,176,255,0.35)' },
];

/* ─────────────────────────────────────────────
   Count-up hook
   ───────────────────────────────────────────── */
function useCountUp(target: number, duration = 1600, active = false) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) {
      setCount(0);
      return;
    }

    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [active, target, duration]);

  return count;
}

/* ─────────────────────────────────────────────
   Individual metric item
   ───────────────────────────────────────────── */
interface MetricItemProps {
  metric: Metric;
  index: number;
  active: boolean;
}

function MetricItem({ metric, index, active }: MetricItemProps) {
  const count = useCountUp(metric.value, 1500 + index * 120, active);

  return (
    <div className="em-metric-item" style={{ '--glow': metric.glowColor } as React.CSSProperties}>
      {/* Subtle radial glow behind the number */}
      <div className="em-metric-glow" aria-hidden="true" />

      {/* Number */}
      <div className="em-metric-number" style={{ fontFamily: 'Outfit, sans-serif' }}>
        <span className="em-metric-digits">{count}</span>
        <span className="em-metric-suffix">{metric.suffix}</span>
      </div>

      {/* Hairline divider */}
      <div className="em-metric-rule" />

      {/* Label */}
      <p className="em-metric-label" style={{ fontFamily: 'Inter, sans-serif' }}>
        {metric.label}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   EventMetrics section
   ───────────────────────────────────────────── */
export function EventMetrics() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting);
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="event-metrics" ref={sectionRef} className="em-section" aria-label="Event metrics">
      {/* Background gradient layer */}
      <div className="em-bg" aria-hidden="true" />

      {/* Horizontal accent line above */}
      <div className="em-top-line" aria-hidden="true" />

      {/* Metrics grid */}
      <div className="em-grid">
        {METRICS.map((metric, i) => (
          <React.Fragment key={metric.label}>
            <MetricItem metric={metric} index={i} active={active} />
            {/* Vertical separator — hidden after last item */}
            {i < METRICS.length - 1 && (
              <div className="em-vsep" aria-hidden="true" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Horizontal accent line below */}
      <div className="em-bottom-line" aria-hidden="true" />

      {/* Component-scoped styles */}
      <style>{`
        /* ── Section shell ── */
        .em-section {
          position: relative;
          background: #060010;
          padding: 6rem 2rem;
          overflow: hidden;
        }

        /* ── Background ── */
        .em-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 55% at 50% 50%, rgba(139,92,246,0.08) 0%, transparent 70%),
            linear-gradient(180deg, #060010 0%, #080014 50%, #060010 100%);
          pointer-events: none;
        }

        /* ── Horizontal lines ── */
        .em-top-line,
        .em-bottom-line {
          position: absolute;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(139,92,246,0.25) 20%,
            rgba(167,139,250,0.35) 50%,
            rgba(139,92,246,0.25) 80%,
            transparent 100%
          );
          pointer-events: none;
        }
        .em-top-line    { top: 0; }
        .em-bottom-line { bottom: 0; }

        /* ── Grid ── */
        .em-grid {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          max-width: 1200px;
          margin: 0 auto;
          gap: 0;
        }

        /* ── Vertical separator ── */
        .em-vsep {
          flex-shrink: 0;
          width: 1px;
          height: 80px;
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(139,92,246,0.30) 30%,
            rgba(167,139,250,0.25) 50%,
            rgba(139,92,246,0.30) 70%,
            transparent 100%
          );
          align-self: center;
        }

        /* ── Metric item ── */
        .em-metric-item {
          position: relative;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0;
          padding: 2rem 1.5rem;
          text-align: center;
        }

        /* Glow under the number */
        .em-metric-glow {
          position: absolute;
          top: 10%;
          left: 50%;
          transform: translateX(-50%);
          width: 160px;
          height: 160px;
          background: radial-gradient(circle at 50% 50%, var(--glow) 0%, transparent 70%);
          pointer-events: none;
          filter: blur(20px);
          opacity: 0.65;
          transition: opacity 0.4s ease;
        }
        .em-metric-item:hover .em-metric-glow {
          opacity: 0.9;
        }

        /* Number container */
        .em-metric-number {
          position: relative;
          display: flex;
          align-items: baseline;
          gap: 0.1em;
          line-height: 1;
          letter-spacing: -0.04em;
        }

        .em-metric-digits {
          font-size: clamp(3.5rem, 6vw, 5.5rem);
          font-weight: 900;
          color: #ffffff;
          line-height: 1;
          transition: color 0.3s ease;
        }

        .em-metric-suffix {
          font-size: clamp(2rem, 3.5vw, 3.5rem);
          font-weight: 900;
          color: #a78bfa;
          line-height: 1;
          align-self: flex-start;
          margin-top: 0.1em;
        }

        .em-metric-item:hover .em-metric-digits {
          color: #e9d5ff;
        }

        /* Hairline rule */
        .em-metric-rule {
          margin: 1.1rem auto 0.9rem;
          width: 2rem;
          height: 1.5px;
          background: linear-gradient(90deg, transparent, rgba(167,139,250,0.55), transparent);
          border-radius: 999px;
          transition: width 0.4s ease;
        }
        .em-metric-item:hover .em-metric-rule {
          width: 3rem;
        }

        /* Label */
        .em-metric-label {
          font-size: clamp(0.7rem, 1.1vw, 0.875rem);
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.42);
          margin: 0;
          transition: color 0.3s ease;
        }
        .em-metric-item:hover .em-metric-label {
          color: rgba(167,139,250,0.75);
        }

        /* ─────────────── Responsive ─────────────── */
        @media (max-width: 768px) {
          .em-section {
            padding: 4rem 1.5rem;
          }

          .em-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0;
          }

          /* Hide the horizontal separators in the grid layout */
          .em-vsep {
            display: none;
          }

          .em-metric-item {
            padding: 2.5rem 1rem;
            border-bottom: 1px solid rgba(139,92,246,0.12);
          }

          /* Remove border from bottom row */
          .em-metric-item:nth-child(5),
          .em-metric-item:nth-child(7) {
            border-bottom: none;
          }

          /* Vertical divider between columns */
          .em-metric-item:nth-child(odd):not(:last-child) {
            border-right: 1px solid rgba(139,92,246,0.12);
          }

          .em-metric-digits {
            font-size: clamp(2.75rem, 10vw, 4rem);
          }

          .em-metric-suffix {
            font-size: clamp(1.75rem, 6vw, 2.5rem);
          }
        }

        @media (max-width: 480px) {
          .em-section {
            padding: 3.5rem 1rem;
          }

          .em-metric-item {
            padding: 2rem 0.75rem;
          }

          .em-metric-digits {
            font-size: clamp(2.5rem, 12vw, 3.5rem);
          }

          .em-metric-suffix {
            font-size: clamp(1.5rem, 7.5vw, 2.25rem);
          }
        }
      `}</style>
    </section>
  );
}
