'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { BrandMotif } from '@/components/ui/brand-motif';
import { sponsorLogos } from '@/components/layout/sponsor-logo';

const EASE = [0.22, 1, 0.36, 1] as const;

export function SponsorShowcase() {
    return (
        <section id="sponsor-showcase" className="relative py-24 bg-[#060010] overflow-hidden">

            {/* Ambient Glow matching home page pattern */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(139,92,246,0.07),transparent)]" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">

                {/* ── Section header ── */}
                <div className="flex flex-col items-center text-center mb-16">

                    {/* Brand Motif (Four Dots) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: EASE }}
                        className="mb-8"
                    >
                        <BrandMotif size={6} gap={10} />
                    </motion.div>

                    {/* Eyebrow badge */}
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
                            2025 Partners
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
                        Our Strategic{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-[#c084fc]">
                            2025 Sponsors.
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
                        className="text-base text-foreground/55 leading-relaxed max-w-2xl mx-auto"
                    >
                        Review the leaders who made the previous event a resounding success.
                        Join this elite group of partners pushing HR into the future.
                    </motion.p>
                </div>

                {/* ── Sponsor Grid ── */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {sponsorLogos.map((sponsor, idx) => (
                        <motion.a
                            key={sponsor.alt}
                            href={sponsor.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, ease: EASE, delay: idx * 0.05 }}
                            className="group relative block aspect-[16/9] overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(139,92,246,0.2)] border border-white/5"
                        >
                            {/* Inner Glow on hover */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(167,139,250,0.1),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                            <div className="relative z-10 flex h-full items-center justify-center filter grayscale group-hover:grayscale-0 transition-all duration-500">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={sponsor.src}
                                    alt={sponsor.alt}
                                    className="max-h-full max-w-full object-contain"
                                />
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* Optional Bottom Accent */}
                <div className="mt-20 flex justify-center">
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: EASE }}
                        className="h-px w-full max-w-lg bg-gradient-to-r from-transparent via-primary/30 to-transparent"
                    />
                </div>
            </div>

            {/* Bottom Glow */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#060010] to-transparent" />
        </section>
    );
}
