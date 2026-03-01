'use client';

import * as React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { AgendaHeroBanner } from '@/components/sections/agenda-hero-banner';
import { BrandMotif } from '@/components/ui/brand-motif';

const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay },
});

export default function AgendaPage() {
    return (
        <main className="flex min-h-[100dvh] flex-col bg-background">
            {/* Hero Section */}
            <AgendaHeroBanner />

            {/* Coming Soon Section */}
            <section className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden px-6 py-24 md:px-12 lg:py-32">
                {/* Visual Depth / Background Accents */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#060010] via-background to-background" />
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-primary/10 blur-[120px]" />
                <div className="pointer-events-none absolute right-0 top-1/4 h-[300px] w-[400px] rounded-[100%] bg-accent/5 blur-[120px]" />

                <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center">
                    <motion.div {...fadeUp(0.1)} className="mb-8">
                        <BrandMotif />
                    </motion.div>

                    {/* Bold Headline */}
                    <motion.h2
                        {...fadeUp(0.2)}
                        className="mb-6 text-5xl font-black tracking-tighter text-foreground md:text-7xl lg:text-8xl"
                    >
                        The 2026 Agenda is <br className="hidden md:block" />
                        <span className="bg-gradient-to-r from-accent via-primary to-purple-400 bg-clip-text text-transparent">
                            Coming Soon
                        </span>
                    </motion.h2>

                    {/* Supporting Copy */}
                    <motion.p
                        {...fadeUp(0.3)}
                        className="mx-auto mb-16 max-w-3xl text-lg font-medium leading-relaxed text-muted-foreground/90 md:text-xl lg:text-2xl"
                    >
                        Get ready for disruptive insights, deep-dive workshops, and actionable strategies that will redefine how you approach HR. We are currently curating an incredible lineup of visionary speakers and bold thought leaders.
                    </motion.p>

                    {/* Opt-in / Notify Box */}
                    <motion.div
                        {...fadeUp(0.4)}
                        className="glass group relative w-full max-w-2xl overflow-hidden rounded-3xl border border-primary/20 p-8 shadow-2xl md:p-12"
                    >
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                        <h3 className="mb-4 text-2xl font-bold md:text-3xl">Want first access?</h3>
                        <p className="mb-8 text-foreground/80 md:text-lg">
                            Sign up to be notified the moment the 2026 agenda drops. Early registrants get exclusive access to reserve seats in limited‑capacity workshops.
                        </p>

                        <form
                            className="mx-auto flex w-full max-w-xl flex-col gap-4 sm:flex-row"
                            onSubmit={(e) => {
                                e.preventDefault();
                                // Optional logic here later
                            }}
                        >
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-1 rounded-full border border-border bg-background/50 px-6 py-4 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                required
                            />
                            <button
                                type="submit"
                                className="btn-glow inline-flex h-14 items-center justify-center whitespace-nowrap rounded-full bg-primary px-8 font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-105 hover:shadow-primary/40 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                            >
                                Notify Me
                            </button>
                        </form>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
