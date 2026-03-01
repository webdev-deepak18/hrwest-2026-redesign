'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { BrandMotif } from '@/components/ui/brand-motif';

// Generate 30 mock speakers for the 2025 event demonstration
const MOCK_SPEAKERS = Array.from({ length: 30 }).map((_, i) => ({
    id: i + 1,
    name: [
        'Sarah', 'Marcus', 'Priya', 'James', 'Elena', 'David', 'Maya', 'Chen', 'Olivia', 'Rachel',
        'Daniel', 'Carlos', 'Aisha', 'Tom', 'Sofia', 'Michael', 'Emma', 'Liam', 'Chloe', 'Noah',
        'Zoe', 'William', 'Ava', 'Lucas', 'Mia', 'Benjamin', 'Amelia', 'Henry', 'Harper', 'Alexander'
    ][i % 30] + ' ' + [
        'Chen', 'Williams', 'Patel', 'O\'Brien', 'Rodriguez', 'Kim', 'Johnson', 'Wei', 'Smith', 'Cohen',
        'Garcia', 'Martinez', 'Khan', 'Taylor', 'Lopez', 'Brown', 'Davis', 'Wilson', 'Anderson', 'Thomas',
        'Jackson', 'White', 'Harris', 'Martin', 'Thompson', 'Moore', 'Young', 'Allen', 'King', 'Wright'
    ][(i * 3) % 30],
    role: [
        'Chief People Officer', 'VP Talent Strategy', 'HR Innovation Lead', 'Director of L&D',
        'Head of Total Rewards', 'VP Employee Experience', 'Global DEI Director', 'Talent Acquisition VP',
        'HR Tech Analyst', 'People Ops Leader'
    ][i % 10],
    company: [
        'Horizon Health', 'TechScale', 'FutureWork Co.', 'Global Dynamics', 'Summit Financial',
        'Apex Manufacturing', 'Nexus Retail', 'Quantum Systems', 'Aegis Security', 'Vanguard Media'
    ][i % 10],
    image: `https://i.pravatar.cc/150?u=speaker${i + 1}`,
}));

const EASE = [0.22, 1, 0.36, 1] as const;

export function SpeakerGrid() {
    return (
        <section id="speaker-grid" className="relative py-24 bg-[#060010] overflow-hidden">

            {/* Subtle ambient glow matching home page pattern */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(139,92,246,0.07),transparent)]" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">

                {/* ── Section header ── */}
                <div className="flex flex-col items-center text-center mb-16">

                    {/* The Motif (Four Dots) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: EASE }}
                        className="mb-8"
                    >
                        <BrandMotif size={6} gap={10} />
                    </motion.div>

                    {/* Eyebrow pill */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
                        className="mb-5"
                    >
                        <span className="glass inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-primary shadow-lg shadow-primary/10">
                            <Users className="h-4 w-4" />
                            <span className="flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                            Past Speakers
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-4 leading-tight mx-auto max-w-3xl"
                    >
                        Learn from the{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-[#c084fc]">
                            Best in HR.
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
                        className="text-base text-foreground/55 leading-relaxed max-w-2xl mx-auto"
                    >
                        Our 2025 stage featured 30 visionaries actively shaping the future of work.
                        Browse the caliber of insight you can expect at HRWest.
                    </motion.p>
                </div>

                {/* ── Dense Speaker Grid (30 Items) ── */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-10">
                    {MOCK_SPEAKERS.map((speaker, idx) => (
                        <motion.div
                            key={speaker.id}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                            transition={{ duration: 0.5, ease: EASE, delay: (idx % 6) * 0.08 }} // Stagger by column
                            className="group relative flex flex-col items-center text-center"
                        >
                            {/* Avatar */}
                            <div className="relative h-24 w-24 sm:h-28 sm:w-28 overflow-hidden rounded-full mb-4 border-2 border-primary/20 bg-muted/20 transition-all duration-300 group-hover:scale-105 group-hover:border-accent group-hover:shadow-[0_0_20px_rgba(167,139,250,0.3)]">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={speaker.image}
                                    alt={speaker.name}
                                    className="h-full w-full object-cover transition-all duration-500 grayscale group-hover:grayscale-0"
                                />
                            </div>

                            {/* Details */}
                            <div className="w-full">
                                <h3 className="text-[15px] font-bold text-foreground leading-tight truncate">
                                    {speaker.name}
                                </h3>
                                <p className="text-[11px] font-bold text-accent mt-1 leading-snug line-clamp-2">
                                    {speaker.role}
                                </p>
                                <p className="text-[11px] font-medium text-foreground/45 mt-0.5 truncate">
                                    {speaker.company}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA / Gradient fade if desired, but this ends cleanly */}
            </div>
        </section>
    );
}
