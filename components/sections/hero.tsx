'use client';

import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, MapPin, Ticket } from 'lucide-react';
import { BrandMotif } from '@/components/ui/brand-motif';

/* ─────────────────────────────────────────────
   Props — keeps the component reusable
   ───────────────────────────────────────────── */
interface HeroProps {
    eventName?: string;
    tagline?: string;
    description?: string;
    eventDate?: Date;
    venueName?: string;
    registrationUrl?: string;
    backgroundImage?: string;
    earlyBirdDeadline?: Date;
    earlyBirdDiscount?: string;
}

/* ─────────────────────────────────────────────
   Countdown helper
   ───────────────────────────────────────────── */
interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

function getTimeLeft(target: Date): TimeLeft {
    const diff = Math.max(target.getTime() - Date.now(), 0);
    return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
    };
}

/* ─────────────────────────────────────────────
   Stagger animation variants
   ───────────────────────────────────────────── */
const fadeUp = (delay: number): HTMLMotionProps<'div'> => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
});

/* ─────────────────────────────────────────────
   Hero Component
   ───────────────────────────────────────────── */
export function Hero({
    eventName = 'HRWest 2026',
    tagline = 'Rising Above the Fog',
    description = 'Finding clarity, connection, and purpose — leading through uncertainty.',
    eventDate = new Date('2026-06-09T09:00:00-07:00'),
    venueName = 'South San Francisco Conference Center',
    registrationUrl = '/attend',
    backgroundImage = '/images/hero-bg.png',
    earlyBirdDeadline = new Date('2026-04-01T23:59:59-07:00'),
    earlyBirdDiscount = '50%',
}: HeroProps) {
    /* ── Countdown state ── */
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft(eventDate));
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const id = setInterval(() => setTimeLeft(getTimeLeft(eventDate)), 1000);
        return () => clearInterval(id);
    }, [eventDate]);

    /* ── Early‐bird check ── */
    const isEarlyBird = earlyBirdDeadline.getTime() > Date.now();

    /* ── Date formatting ── */
    const formatEventDate = useCallback(() => {
        return eventDate.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });
    }, [eventDate]);

    /* ── Pad helper ── */
    const pad = (n: number) => String(n).padStart(2, '0');

    return (
        <section
            id="hero"
            className="relative flex min-h-[85dvh] lg:min-h-[100dvh] items-center justify-center overflow-hidden"
        >
            {/* ── Background image ── */}
            <Image
                src={backgroundImage}
                alt="San Francisco skyline emerging from fog — cinematic purple tones"
                fill
                priority
                className="object-cover object-center"
                quality={90}
                sizes="100vw"
            />

            {/* ── Gradient overlays ── */}
            {/* Top-down deep purple vignette */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#060010]/80 via-[#060010]/40 to-[#060010]/95" />
            {/* Radial glow behind text */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(139,92,246,0.18),transparent)]" />

            {/* ── Content ── */}
            <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-4 py-8 text-center sm:px-8 md:py-[24px] lg:py-[24px] mt-10 md:mt-0">

                {/* ── Urgency badge ── */}
                {isEarlyBird && (
                    <motion.div {...fadeUp(0.05)}>
                        <span className="glass mb-8 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-primary shadow-lg shadow-primary/10">
                            <Ticket className="h-4 w-4" />
                            <span className="flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                            Early Bird — Save {earlyBirdDiscount} until April 1
                        </span>
                    </motion.div>
                )}



                {/* ── Primary headline ── */}
                <motion.h1
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                    className="text-5xl font-black tracking-tighter text-foreground sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
                >
                    {eventName}
                </motion.h1>

                {/* ── Sub-headline (gradient) ── */}
                <motion.p
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                    className="mt-3 font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-[#c084fc] text-xl sm:text-2xl md:text-3xl lg:text-4xl md:mt-4"
                >
                    {tagline}
                </motion.p>

                {/* ── Supporting copy ── */}
                <motion.p
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                    className="mx-auto mt-4 max-w-xl text-base font-medium text-foreground/70 sm:text-lg md:mt-6 md:text-xl"
                >
                    {description}
                </motion.p>

                {/* ── CTA ── */}
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                    className="mt-6 md:mt-12"
                >
                    <Link
                        href={registrationUrl}
                        className="btn-glow group relative inline-flex h-12 md:h-14 items-center justify-center gap-2 rounded-full bg-primary px-8 md:px-10 text-base md:text-lg font-bold text-primary-foreground shadow-xl shadow-primary/25 transition-all duration-300 hover:scale-105 hover:shadow-primary/40 sm:h-16 sm:px-12 sm:text-xl"
                    >
                        Register Now
                        <ArrowRight className="h-4 w-4 md:h-5 md:w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </motion.div>

                {/* ── Countdown timer ── */}
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
                    className="mt-8 flex items-center gap-1.5 sm:gap-3 md:mt-16"
                >
                    {[
                        { value: timeLeft.days, label: 'Days' },
                        { value: timeLeft.hours, label: 'Hours' },
                        { value: timeLeft.minutes, label: 'Min' },
                        { value: timeLeft.seconds, label: 'Sec' },
                    ].map((unit, i) => (
                        <React.Fragment key={unit.label}>
                            {i > 0 && (
                                <span className="text-lg md:text-xl font-bold text-primary/50 select-none sm:text-2xl">
                                    :
                                </span>
                            )}
                            <div className="glass flex flex-col items-center rounded-lg md:rounded-xl px-2.5 py-1.5 md:px-3.5 md:py-2.5 min-w-[48px] md:min-w-[56px] sm:min-w-[68px] sm:rounded-2xl sm:px-5 sm:py-3">
                                <span className="text-xl md:text-2xl font-black tabular-nums text-foreground sm:text-3xl md:text-4xl">
                                    {mounted ? pad(unit.value) : '--'}
                                </span>
                                <span className="mt-0.5 text-[9px] md:text-[10px] font-semibold uppercase tracking-widest text-foreground/50 sm:text-xs">
                                    {unit.label}
                                </span>
                            </div>
                        </React.Fragment>
                    ))}
                </motion.div>

                {/* ── Event meta ── */}
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
                    className="mt-6 flex flex-col items-center gap-2 text-foreground/60 sm:flex-row sm:gap-6 md:mt-14"
                >
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                        <span className="text-xs md:text-sm font-semibold text-foreground/80 sm:text-base">
                            {formatEventDate()}
                        </span>
                    </div>
                    <div className="hidden h-4 w-px bg-border sm:block" />
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 md:h-5 md:w-5 text-accent" />
                        <span className="text-xs md:text-sm font-semibold text-foreground/80 sm:text-base">
                            {venueName}
                        </span>
                    </div>
                </motion.div>
            </div>

            {/* ── Bottom fade to --background ── */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#060010] to-transparent" />
        </section>
    );
}
