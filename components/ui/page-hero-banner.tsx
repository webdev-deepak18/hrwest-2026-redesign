'use client';

import * as React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import Link from 'next/link';
import {
    ArrowRight,
    Mic,
    Calendar,
    Users,
    BookOpen,
    Layers,
    Award,
    MapPin,
    type LucideIcon,
} from 'lucide-react';
import ShinyText from '@/components/ui/ShinyText';

/* Icon name → component lookup (serializable across server/client boundary) */
const ICON_MAP: Record<string, LucideIcon> = {
    Mic, Calendar, Users, BookOpen, Layers, Award, MapPin,
};

/* ─────────────────────────────────────────────
   Props
   ───────────────────────────────────────────── */
export interface PageHeroBannerProps {
    /** Small label shown in the pill badge above the headline */
    eyebrow?: string;
    /**
     * Name of the icon to render inside the eyebrow pill.
     * Supported: 'Mic' | 'Calendar' | 'Users' | 'BookOpen' | 'Layers' | 'Award' | 'MapPin'
     */
    eyebrowIconName?: 'Mic' | 'Calendar' | 'Users' | 'BookOpen' | 'Layers' | 'Award' | 'MapPin';
    /** Large primary headline — rendered with ShinyText animation */
    headline: string;
    /** Gradient sub-headline beneath the main title */
    tagline?: string;
    /** Optional short description line beneath the tagline */
    description?: string;
    /** CTA button label */
    ctaText?: string;
    /** CTA button href */
    ctaHref?: string;
    /**
     * Path to a decorative image placed on the right side.
     * For seamless blending: source image MUST have a pure black background.
     * CSS mix-blend-mode:screen makes the black pixels transparent so the
     * image composites naturally against the dark gradient.
     */
    blendImage?: string;
    /**
     * alt text for the blend image (hidden from screen readers by default
     * since it's decorative — pass a non-empty string to override)
     */
    blendImageAlt?: string;
}

/* ─────────────────────────────────────────────
   Animation helper — same easing as home hero
   ───────────────────────────────────────────── */
const fadeUp = (delay: number): HTMLMotionProps<'div'> => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
});

/* ─────────────────────────────────────────────
   PageHeroBanner — generic inner-page hero
   ───────────────────────────────────────────── */
export function PageHeroBanner({
    eyebrow,
    eyebrowIconName,
    headline,
    tagline,
    description,
    ctaText,
    ctaHref = '#',
    blendImage,
    blendImageAlt = '',
}: PageHeroBannerProps) {
    return (
        <section
            id="page-hero"
            className="relative flex min-h-[48dvh] lg:min-h-[54dvh] items-center justify-start overflow-hidden bg-[#060010]"
        >
            {/* ── Gradient background — matches home hero palette ── */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0a0118] via-[#060010] to-[#0f0720]" />
            {/* Violet radial glow behind text */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_70%_at_15%_50%,rgba(139,92,246,0.20),transparent)]" />
            {/* Warm ambient on the right to receive the blend image */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_80%_at_85%_50%,rgba(139,92,246,0.10),transparent)]" />

            {/* ── Blend image (decorative, right-side) ──
                Source must be on a pure black background.
                mix-blend-mode:screen removes black → seamless composite.   */}
            {blendImage && (
                <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={blendImage}
                        alt={blendImageAlt}
                        aria-hidden={blendImageAlt === '' ? true : undefined}
                        className="pointer-events-none absolute right-0 top-0 h-full w-auto max-w-[52%] object-contain object-right select-none"
                        style={{
                            mixBlendMode: 'screen',
                            maskImage: 'linear-gradient(to left, black 40%, transparent 100%), linear-gradient(to top, black 40%, transparent 100%)',
                            WebkitMaskImage: 'linear-gradient(to left, black 40%, transparent 100%), linear-gradient(to top, black 40%, transparent 100%)',
                            maskComposite: 'intersect',
                            WebkitMaskComposite: 'source-in'
                        }}
                    />
                    {/* Soft right-edge dissolve */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#060010]/60 to-transparent" />
                </>
            )}

            {/* ── Content ── */}
            <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-start px-6 py-12 sm:px-10 lg:px-16">

                {/* Eyebrow badge */}
                {eyebrow && (
                    <motion.div {...fadeUp(0.05)}>
                        <span className="glass mb-5 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-primary shadow-lg shadow-primary/10">
                            {eyebrowIconName && (() => {
                                const Icon = ICON_MAP[eyebrowIconName];
                                return Icon ? <Icon className="h-4 w-4" /> : null;
                            })()}
                            <span className="flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                            {eyebrow}
                        </span>
                    </motion.div>
                )}

                {/* Primary headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                    className="text-4xl font-black tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
                >
                    <ShinyText
                        text={headline}
                        speed={4}
                        delay={1}
                        color="#ffffff"
                        shineColor="#c4b5fd"
                        spread={100}
                        direction="left"
                        yoyo={false}
                        pauseOnHover={false}
                    />
                </motion.h1>

                {/* Gradient tagline */}
                {tagline && (
                    <motion.p
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
                        className="mt-3 font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-[#c084fc] text-lg sm:text-xl md:text-2xl lg:text-3xl"
                    >
                        {tagline}
                    </motion.p>
                )}

                {/* Optional description */}
                {description && (
                    <motion.p
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.32 }}
                        className="mt-3 max-w-lg text-sm text-foreground/60 leading-relaxed sm:text-base"
                    >
                        {description}
                    </motion.p>
                )}

                {/* CTA button */}
                {ctaText && (
                    <motion.div
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.38 }}
                        className="mt-8"
                    >
                        <Link
                            href={ctaHref}
                            className="btn-glow group relative inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-8 text-sm font-bold text-primary-foreground shadow-xl shadow-primary/25 transition-all duration-300 hover:scale-105 hover:shadow-primary/40"
                        >
                            {ctaText}
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </motion.div>
                )}
            </div>

            {/* Bottom fade to background */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#060010] to-transparent" />
        </section>
    );
}
