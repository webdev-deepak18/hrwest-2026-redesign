'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, CalendarDays } from 'lucide-react';

/* ─────────────────────────────────────────────
   Data
   ───────────────────────────────────────────── */
const TRACKS = [
    'HR Tech',
    'HR Strategy / AI',
    'Talent',
    'Legal & Compliance',
    'Leadership',
    'Health & Wellness',
];

const EASE = [0.22, 1, 0.36, 1] as const;

function fadeIn(delay: number) {
    return {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.7, ease: EASE, delay },
        viewport: { once: true },
    };
}

/* ─────────────────────────────────────────────
   Component
   ───────────────────────────────────────────── */
export function SpeakerInfoSection() {
    return (
        <section
            id="speakers-info"
            className="relative bg-[#060010] py-20 md:py-28 overflow-hidden"
        >
            {/* Subtle ambient glow */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(139,92,246,0.07),transparent)]" />

            <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">

                {/* ── Two-column grid ── */}
                <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">

                    {/* ── LEFT ── */}
                    <div className="flex flex-col gap-10">

                        {/* Eyebrow */}
                        <motion.div {...fadeIn(0)}>
                            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
                                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                                Call for Speakers
                            </span>
                        </motion.div>

                        {/* Headline */}
                        <motion.div {...fadeIn(0.08)} className="-mt-4">
                            <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl md:text-5xl leading-tight">
                                Have insights that{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-[#c084fc]">
                                    move HR forward?
                                </span>
                            </h2>
                            <p className="mt-5 text-base text-foreground/55 leading-relaxed max-w-md">
                                We&apos;re looking for HR professionals and thought leaders to present sessions and host roundtables at HRWest 2026.
                            </p>
                        </motion.div>

                        {/* Track chips */}
                        <motion.div {...fadeIn(0.16)}>
                            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/35">
                                Open Tracks
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {TRACKS.map((track) => (
                                    <span
                                        key={track}
                                        className="rounded-full border border-border/50 bg-white/[0.03] px-3.5 py-1.5 text-sm font-medium text-foreground/60 transition-all duration-200 hover:border-primary/40 hover:text-foreground/90 hover:bg-primary/8"
                                    >
                                        {track}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* ── RIGHT — Application card ── */}
                    <motion.div {...fadeIn(0.12)}>
                        <div className="glass rounded-2xl p-8 md:p-10 flex flex-col gap-8">

                            {/* Deadline */}
                            <div className="flex items-start gap-4">
                                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                                    <CalendarDays className="h-5 w-5" />
                                </span>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary mb-1">
                                        Application Deadline
                                    </p>
                                    <p className="text-2xl font-black text-foreground tracking-tight">April 1, 2026</p>
                                </div>
                            </div>

                            <div className="h-px bg-border/40" />

                            {/* Who should apply — just 3 punchy lines */}
                            <div className="space-y-3">
                                {[
                                    'HR practitioners & People leaders',
                                    'Independent thought leaders & authors',
                                    'Researchers & HR consultants',
                                ].map((item) => (
                                    <div key={item} className="flex items-center gap-3 text-sm text-foreground/65">
                                        <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                                        {item}
                                    </div>
                                ))}
                            </div>

                            <div className="h-px bg-border/40" />

                            {/* CTA */}
                            <Link
                                href="#"
                                className="btn-glow group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-8 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-105 hover:shadow-primary/40"
                            >
                                Apply to Speak
                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
