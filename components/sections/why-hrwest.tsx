'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ScrollStack, { ScrollStackItem } from '@/components/ui/ScrollStack';

/* ─────────────────────────────────────────────
   Card data
   ───────────────────────────────────────────── */
const cards = [
    {
        id: 'value',
        number: '01',
        total: '05',
        headline: 'Enjoy the Best HR Event Value',
        body: 'Pay hundreds or thousands less than most high-quality events. World-class content at a price that respects your budget — no inflated speaker fees passed on to you.',
        image: '/images/scroll-card-value.png',
        imageAlt: 'Conference hall with attendees seated at round tables in purple-toned lighting',
        accentColor: '#8b5cf6',
    },
    {
        id: 'peers',
        number: '02',
        total: '05',
        headline: 'Engage With Peers',
        body: 'Make new HR friends and exchange ideas during intimate roundtable sessions. Connect with people who face the same challenges you do — real conversations, real solutions.',
        image: '/images/scroll-card-peers.png',
        imageAlt: 'Diverse HR professionals engaged in roundtable discussion',
        accentColor: '#a78bfa',
    },
    {
        id: 'experts',
        number: '03',
        total: '05',
        headline: 'Learn From Real Experts',
        body: 'Take home HR game plans and actionable tips to thrive in 2026 and beyond. Every speaker has lived these challenges — no theory, just field-tested insight you can apply on Monday.',
        image: '/images/scroll-card-experts.png',
        imageAlt: 'Keynote speaker presenting on stage with purple lighting',
        accentColor: '#c084fc',
    },
    {
        id: 'clarity',
        number: '04',
        total: '05',
        headline: 'Get Clarity on Your Future',
        body: 'Discover key steps to take on critical issues like AI and your career trajectory. Leave with a clear roadmap — not more uncertainty — from sessions built for the decisions you face right now.',
        image: '/images/scroll-card-clarity.png',
        imageAlt: 'HR professional viewing glowing digital career path display',
        accentColor: '#818cf8',
    },
    {
        id: 'experiences',
        number: '05',
        total: '05',
        headline: 'Enjoy Special Experiences',
        body: 'From contests to connecting with HR friends, this is an event you\'ll love. The memories you make here — and the people you meet — will last long after the conference ends.',
        image: '/images/scroll-card-experiences.png',
        imageAlt: 'HR conference reception with professionals networking and celebrating',
        accentColor: '#e879f9',
    },
] as const;

/* ─────────────────────────────────────────────
   Section Header
   ───────────────────────────────────────────── */
function SectionHeader() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mb-20 max-w-4xl px-6 text-center"
        >
            {/* Eyebrow label */}
            <span
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-violet-300"
            >
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
                Why HRWest
            </span>

            {/* Main title */}
            <h2
                className="mt-4 text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
                style={{ fontFamily: 'Outfit, sans-serif' }}
            >
                The Event That Brings the{' '}
                <span
                    className="bg-clip-text text-transparent"
                    style={{
                        backgroundImage: 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 50%, #c084fc 100%)',
                    }}
                >
                    HR Community
                </span>{' '}
                Together
            </h2>

            {/* Subtitle */}
            <p
                className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg md:text-xl"
                style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.7' }}
            >
                Other conferences charge premium prices for celebrity keynotes with little relevance to HR.
                HRWest delivers practical, real-world insights from HR professionals you can actually learn
                from — without the inflated price tag.
            </p>

            {/* Decorative rule */}
            <div className="mx-auto mt-10 h-px w-24 bg-gradient-to-r from-transparent via-violet-500/60 to-transparent" />
        </motion.div>
    );
}

/* ─────────────────────────────────────────────
   Individual Card Content
   ───────────────────────────────────────────── */
interface CardContentProps {
    card: (typeof cards)[number];
    index: number;
}

function CardContent({ card, index }: CardContentProps) {
    return (
        <div className="why-hrwest-card-inner">
            {/* ── Left: Content panel ── */}
            <div className="why-hrwest-content-panel">
                {/* Glass inner surface */}
                <div className="why-hrwest-glass-panel">
                    {/* Number indicator */}
                    <div className="why-hrwest-number-row">
                        <span
                            className="why-hrwest-number-current"
                            style={{ color: card.accentColor }}
                        >
                            {card.number}
                        </span>
                        <span className="why-hrwest-number-sep">/</span>
                        <span className="why-hrwest-number-total">{card.total}</span>
                    </div>

                    {/* Headline */}
                    <h3
                        className="why-hrwest-headline"
                        style={{ fontFamily: 'Outfit, sans-serif' }}
                    >
                        {card.headline}
                    </h3>

                    {/* Body */}
                    <p
                        className="why-hrwest-body"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                        {card.body}
                    </p>

                    {/* Accent line */}
                    <div
                        className="why-hrwest-accent-line"
                        style={{ backgroundColor: card.accentColor }}
                    />
                </div>
            </div>

            {/* ── Right: Image panel ── */}
            <div className="why-hrwest-image-panel">
                <div className="why-hrwest-image-wrapper">
                    <Image
                        src={card.image}
                        alt={card.imageAlt}
                        fill
                        className="why-hrwest-image"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={index === 0}
                    />
                    {/* Subtle dark overlay for text legibility when image is visible */}
                    <div
                        className="why-hrwest-image-overlay"
                        style={{
                            background: `linear-gradient(135deg, rgba(6,0,16,0.45) 0%, transparent 60%)`,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────
   Why HRWest Section
   ───────────────────────────────────────────── */
export function WhyHRWest() {
    return (
        <section
            id="why-hrwest"
            className="why-hrwest-section"
        >
            {/* Radial ambient glow behind the section */}
            <div className="why-hrwest-bg-glow" aria-hidden="true" />

            {/* Content wrapper — constrains width */}
            <div className="why-hrwest-container">
                {/* Section header */}
                <SectionHeader />

                {/* ScrollStack */}
                <div className="why-hrwest-stack-wrapper">
                    <ScrollStack
                        itemDistance={200}
                        itemStackDistance={28}
                        stackPosition="18%"
                        scaleEndPosition="10%"
                        baseScale={0.88}
                        itemScale={0.025}
                        blurAmount={1.5}
                        className="why-hrwest-scroll-stack"
                    >
                        {cards.map((card, i) => (
                            <ScrollStackItem
                                key={card.id}
                                itemClassName="why-hrwest-card"
                            >
                                <CardContent card={card} index={i} />
                            </ScrollStackItem>
                        ))}
                    </ScrollStack>
                </div>
            </div>

            {/* Bottom fade to continue page */}
            <div className="why-hrwest-bottom-fade" aria-hidden="true" />

            {/* Component-scoped styles */}
            <style>{`
        /* ── Section shell ── */
        .why-hrwest-section {
          position: relative;
          background: #060010;
          padding-top: 6rem;
          overflow: hidden;
        }

        .why-hrwest-bg-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 80% 60% at 50% 20%, rgba(139,92,246,0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        .why-hrwest-container {
          position: relative;
          z-index: 1;
          max-width: 1440px;
          margin: 0 auto;
        }

        /* ── Stack wrapper ── */
        .why-hrwest-stack-wrapper {
          width: 100%;
          height: 85vh;
          min-height: 560px;
        }

        .why-hrwest-scroll-stack {
          height: 100%;
        }

        /* Override default inner padding to fit within the section's container */
        .why-hrwest-scroll-stack .scroll-stack-inner {
          padding: 10vh 3rem 60rem;
        }

        /* ── Card shell ── */
        .why-hrwest-card {
          height: auto !important;
          min-height: 480px;
          background: #0a0118;
          border: 1px solid rgba(139, 92, 246, 0.18);
          box-shadow:
            0 0 0 1px rgba(139, 92, 246, 0.08),
            0 8px 40px rgba(0, 0, 0, 0.6),
            0 0 80px rgba(139, 92, 246, 0.06);
          border-radius: 28px;
          overflow: hidden;
          margin-left: 2rem;
          margin-right: 2rem;
        }

        /* ── Inner two-column layout ── */
        .why-hrwest-card-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          height: 100%;
          min-height: 480px;
        }

        /* ── Left: content panel ── */
        .why-hrwest-content-panel {
          display: flex;
          align-items: center;
          padding: 3rem 3.5rem;
        }

        .why-hrwest-glass-panel {
          width: 100%;
          background: rgba(15, 7, 32, 0.55);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(139, 92, 246, 0.12);
          border-radius: 20px;
          padding: 2.5rem 2.5rem 2.5rem;
          position: relative;
        }

        /* Number row */
        .why-hrwest-number-row {
          display: flex;
          align-items: baseline;
          gap: 0.4rem;
          margin-bottom: 1.75rem;
          font-family: 'Outfit', sans-serif;
        }

        .why-hrwest-number-current {
          font-size: 2.25rem;
          font-weight: 900;
          line-height: 1;
          letter-spacing: -0.03em;
        }

        .why-hrwest-number-sep {
          font-size: 1rem;
          color: rgba(255,255,255,0.2);
          margin: 0 0.1rem;
        }

        .why-hrwest-number-total {
          font-size: 0.9rem;
          font-weight: 600;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.05em;
        }

        /* Headline */
        .why-hrwest-headline {
          font-size: clamp(1.5rem, 2.2vw, 2rem);
          font-weight: 800;
          color: #ffffff;
          line-height: 1.15;
          letter-spacing: -0.025em;
          margin-bottom: 1.25rem;
        }

        /* Body */
        .why-hrwest-body {
          font-size: 0.975rem;
          line-height: 1.75;
          color: rgba(255, 255, 255, 0.55);
          max-width: 38ch;
        }

        /* Accent line */
        .why-hrwest-accent-line {
          margin-top: 2rem;
          height: 2px;
          width: 3rem;
          border-radius: 999px;
          opacity: 0.7;
        }

        /* ── Right: image panel ── */
        .why-hrwest-image-panel {
          position: relative;
          overflow: hidden;
        }

        .why-hrwest-image-wrapper {
          position: absolute;
          inset: 0;
        }

        .why-hrwest-image {
          object-fit: cover;
          object-position: center;
          filter: saturate(0.9) brightness(0.85);
          transition: transform 0.6s ease, filter 0.6s ease;
        }

        .why-hrwest-card:hover .why-hrwest-image {
          transform: scale(1.04);
          filter: saturate(1.05) brightness(0.9);
        }

        .why-hrwest-image-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        /* ── Bottom fade ── */
        .why-hrwest-bottom-fade {
          position: relative;
          height: 4rem;
          background: linear-gradient(to bottom, transparent, #060010);
          margin-top: -4rem;
          pointer-events: none;
          z-index: 2;
        }

        /* ─────────────── Responsive ─────────────── */
        @media (max-width: 900px) {
          .why-hrwest-stack-wrapper {
            height: auto;
            min-height: unset;
          }

          .why-hrwest-scroll-stack {
            height: 80vh;
          }

          .why-hrwest-scroll-stack .scroll-stack-inner {
            padding: 8vh 1.5rem 50rem;
          }

          .why-hrwest-card {
            min-height: 520px;
            margin-left: 1rem;
            margin-right: 1rem;
          }

          .why-hrwest-card-inner {
            grid-template-columns: 1fr;
            grid-template-rows: 260px 1fr;
          }

          /* Image on top on mobile */
          .why-hrwest-image-panel {
            order: -1;
            min-height: 260px;
          }

          .why-hrwest-content-panel {
            padding: 2rem 1.75rem;
          }

          .why-hrwest-glass-panel {
            padding: 2rem 1.75rem;
          }

          .why-hrwest-number-current {
            font-size: 1.75rem;
          }

          .why-hrwest-headline {
            font-size: 1.35rem;
          }

          .why-hrwest-body {
            max-width: none;
          }
        }

        @media (max-width: 600px) {
          .why-hrwest-section {
            padding-top: 4rem;
          }

          .why-hrwest-card {
            min-height: 460px;
            margin-left: 0.5rem;
            margin-right: 0.5rem;
          }

          .why-hrwest-card-inner {
            grid-template-rows: 220px 1fr;
          }

          .why-hrwest-content-panel {
            padding: 1.5rem 1.25rem;
          }

          .why-hrwest-glass-panel {
            padding: 1.5rem 1.25rem;
            border-radius: 14px;
          }
        }
      `}</style>
        </section>
    );
}
