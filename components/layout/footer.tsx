'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, CalendarDays, Star, ArrowRight, ExternalLink } from 'lucide-react';
import type { Variants } from 'framer-motion';

// ─── ANIMATION VARIANTS ───────────────────────────────────────────────────────

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
    }),
};

// ─── FOOTER ───────────────────────────────────────────────────────────────────

export function Footer() {
    return (
        <footer
            aria-label="Site footer"
            style={{
                background: 'linear-gradient(180deg, #060010 0%, #0a0118 100%)',
                borderTop: '1px solid rgba(139, 92, 246, 0.15)',
            }}
        >
            {/* ── TOP ACCENT LINE ── */}
            <div
                className="h-px w-full"
                style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(139, 92, 246, 0.6) 50%, transparent 100%)',
                }}
            />

            {/* ── MAIN ACTION SECTION ── */}
            <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">

                    {/* LEFT — CONTACT BLOCK */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={0}
                        className="flex flex-col justify-center"
                        style={{
                            background: 'rgba(15, 7, 32, 0.6)',
                            backdropFilter: 'blur(16px)',
                            WebkitBackdropFilter: 'blur(16px)',
                            border: '1px solid rgba(139, 92, 246, 0.12)',
                            borderRadius: '1.25rem',
                            padding: '2.5rem',
                        } as React.CSSProperties}
                    >
                        {/* Eyebrow pill */}
                        <div className="inline-flex items-center gap-2 mb-5 self-start">
                            <span
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    border: '1px solid rgba(139, 92, 246, 0.4)',
                                    borderRadius: '9999px',
                                    padding: '0.25rem 0.875rem',
                                    fontSize: '0.6875rem',
                                    fontWeight: 700,
                                    letterSpacing: '0.12em',
                                    textTransform: 'uppercase',
                                    color: '#a78bfa',
                                }}
                            >
                                <span
                                    style={{
                                        width: '6px',
                                        height: '6px',
                                        borderRadius: '50%',
                                        background: '#8b5cf6',
                                        boxShadow: '0 0 8px #8b5cf6',
                                        animation: 'pulse 2s infinite',
                                        flexShrink: 0,
                                    }}
                                />
                                Support
                            </span>
                        </div>

                        <h2
                            className="font-black tracking-tight text-white mb-2"
                            style={{
                                fontFamily: '"Outfit", sans-serif',
                                fontSize: 'clamp(1.6rem, 3vw, 2.25rem)',
                                lineHeight: 1.1,
                            }}
                        >
                            Need additional help?
                        </h2>

                        <p
                            className="mb-8"
                            style={{
                                fontFamily: '"Outfit", sans-serif',
                                fontSize: '1.05rem',
                                fontWeight: 600,
                                background: 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 50%, #c084fc 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            } as React.CSSProperties}
                        >
                            Contact the HR.com Events Team!
                        </p>

                        <div className="flex flex-col gap-4">
                            {/* Phone */}
                            <a
                                href="tel:18774726648"
                                className="group flex items-center gap-3 transition-all duration-200"
                                aria-label="Call HR.com Events Team"
                            >
                                <div
                                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-200 group-hover:scale-105"
                                    style={{
                                        background: 'rgba(139, 92, 246, 0.15)',
                                        border: '1px solid rgba(139, 92, 246, 0.25)',
                                    }}
                                >
                                    <Phone className="h-4 w-4 text-purple-400" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-0.5">Call</p>
                                    <p className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                                        1-877-472-6648
                                    </p>
                                </div>
                            </a>

                            {/* Email */}
                            <a
                                href="mailto:hrwest@hr.com"
                                className="group flex items-center gap-3 transition-all duration-200"
                                aria-label="Email HR.com Events Team"
                            >
                                <div
                                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-200 group-hover:scale-105"
                                    style={{
                                        background: 'rgba(139, 92, 246, 0.15)',
                                        border: '1px solid rgba(139, 92, 246, 0.25)',
                                    }}
                                >
                                    <Mail className="h-4 w-4 text-purple-400" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-0.5">Email</p>
                                    <p className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                                        hrwest@hr.com
                                    </p>
                                </div>
                            </a>
                        </div>
                    </motion.div>

                    {/* RIGHT — EVENT + CTA BLOCK */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={0.12}
                        className="flex flex-col justify-between relative overflow-hidden"
                        style={{
                            borderRadius: '1.25rem',
                            padding: '2.5rem',
                            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.18) 0%, rgba(124, 58, 237, 0.12) 50%, rgba(192, 132, 252, 0.08) 100%)',
                            border: '1px solid rgba(139, 92, 246, 0.3)',
                            boxShadow: '0 0 60px rgba(139, 92, 246, 0.12), inset 0 1px 0 rgba(255,255,255,0.05)',
                        }}
                    >
                        {/* Decorative radial glow */}
                        <div
                            aria-hidden="true"
                            style={{
                                position: 'absolute',
                                top: '-40px',
                                right: '-40px',
                                width: '220px',
                                height: '220px',
                                borderRadius: '50%',
                                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, transparent 70%)',
                                pointerEvents: 'none',
                            }}
                        />
                        <div
                            aria-hidden="true"
                            className="absolute inset-x-8 top-0 h-px"
                            style={{
                                background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.6), transparent)',
                            }}
                        />

                        {/* Heading */}
                        <div className="mb-6 relative">
                            <p className="text-xs font-bold uppercase tracking-widest text-purple-400/80 mb-3">
                                Don&apos;t miss out
                            </p>
                            <h2
                                className="font-black tracking-tight text-white"
                                style={{
                                    fontFamily: '"Outfit", sans-serif',
                                    fontSize: 'clamp(1.6rem, 3vw, 2.25rem)',
                                    lineHeight: 1.1,
                                }}
                            >
                                Experience{' '}
                                <span
                                    style={{
                                        background: 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 50%, #c084fc 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    } as React.CSSProperties}
                                >
                                    HRWest 2026
                                </span>
                            </h2>
                        </div>

                        {/* Event details */}
                        <div className="flex flex-col gap-3 mb-8 relative">
                            <div className="flex items-center gap-3">
                                <div
                                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                                    style={{
                                        background: 'rgba(139, 92, 246, 0.2)',
                                        border: '1px solid rgba(139, 92, 246, 0.3)',
                                    }}
                                >
                                    <CalendarDays className="h-4 w-4 text-purple-300" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-0.5">Date</p>
                                    <p className="text-sm font-bold text-white">June 9–10, 2026</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div
                                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                                    style={{
                                        background: 'rgba(139, 92, 246, 0.2)',
                                        border: '1px solid rgba(139, 92, 246, 0.3)',
                                    }}
                                >
                                    <MapPin className="h-4 w-4 text-purple-300" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-0.5">Venue</p>
                                    <p className="text-sm font-bold text-white">South San Francisco Conference Center</p>
                                </div>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <Link
                            href="/register"
                            id="footer-register-cta"
                            className="relative group inline-flex w-full items-center justify-center gap-2 rounded-full py-4 text-base font-black text-white transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
                            style={{
                                background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                                boxShadow: '0 0 28px rgba(139, 92, 246, 0.45)',
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 48px rgba(139, 92, 246, 0.7)';
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 28px rgba(139, 92, 246, 0.45)';
                            }}
                        >
                            <Star className="h-4 w-4" />
                            Register Now
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* ── DIVIDER ── */}
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
                <div
                    className="h-px w-full"
                    style={{
                        background: 'linear-gradient(90deg, transparent 0%, rgba(139, 92, 246, 0.25) 30%, rgba(45, 26, 74, 0.8) 50%, rgba(139, 92, 246, 0.25) 70%, transparent 100%)',
                    }}
                />
            </div>

            {/* ── LEGAL ROW ── */}
            <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

                    {/* Copyright */}
                    <p
                        className="text-xs text-zinc-500 text-center sm:text-left"
                        style={{ fontFamily: '"Inter", sans-serif' }}
                    >
                        © 2026 HRWest Conference. All rights reserved.
                    </p>

                    {/* Legal links + HR.com Home */}
                    <div className="flex items-center gap-6 flex-wrap justify-center">
                        <Link
                            href="/privacy"
                            className="text-xs text-zinc-500 hover:text-purple-400 transition-colors duration-200"
                            id="footer-privacy-policy"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="/terms"
                            className="text-xs text-zinc-500 hover:text-purple-400 transition-colors duration-200"
                            id="footer-terms-of-service"
                        >
                            Terms of Service
                        </Link>

                        {/* Separator dot */}
                        <span className="text-zinc-700 text-xs select-none" aria-hidden>•</span>

                        <a
                            href="https://www.hr.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            id="footer-hrcom-home"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors duration-200"
                        >
                            HR.com Home
                            <ExternalLink className="h-3 w-3" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
