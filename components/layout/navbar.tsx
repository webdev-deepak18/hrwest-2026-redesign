'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
    Menu, X, ChevronDown,
    Users, CalendarDays, Sparkles, Trophy,
    HandHeart, Building2, Mic2, ArrowRight,
    Star, LayoutGrid,
} from 'lucide-react';

// ─── DATA ────────────────────────────────────────────────────────────────────

type MegaItem = {
    name: string;
    href: string;
    description: string;
    icon: React.ElementType;
};

type MegaGroup = {
    heading: string;
    items: MegaItem[];
};

type NavLink = {
    name: string;
    href: string;
    mega?: MegaGroup[];
};

const NAV_LINKS: NavLink[] = [
    {
        name: 'Program',
        href: '#',
        mega: [
            {
                heading: 'Explore',
                items: [
                    {
                        name: 'Speakers',
                        href: '/program/speakers',
                        description: 'World-class HR leaders & keynotes',
                        icon: Mic2,
                    },
                    {
                        name: '2025 Agenda',
                        href: '/program/agenda',
                        description: 'Full schedule of sessions & workshops',
                        icon: CalendarDays,
                    },
                ],
            },
            {
                heading: 'Discover',
                items: [
                    {
                        name: 'Sponsors',
                        href: '/program/sponsors',
                        description: 'Industry partners powering HRWest',
                        icon: Building2,
                    },
                    {
                        name: 'FutureHR Showdown',
                        href: '/program/future-hr',
                        description: 'The ultimate HR startup competition',
                        icon: Trophy,
                    },
                ],
            },
        ],
    },
    {
        name: 'Attend',
        href: '#',
        mega: [
            {
                heading: 'Register',
                items: [
                    {
                        name: 'Attend as a Team',
                        href: '/attend/team',
                        description: 'Group rates & team packages available',
                        icon: Users,
                    },
                    {
                        name: 'Volunteer',
                        href: '/attend/volunteer',
                        description: 'Join the crew behind HRWest',
                        icon: HandHeart,
                    },
                ],
            },
            {
                heading: 'Plan Ahead',
                items: [
                    {
                        name: 'Ask Your Employer',
                        href: '/attend/ask-employer',
                        description: 'Make the case for attending HRWest',
                        icon: Sparkles,
                    },
                ],
            },
        ],
    },
    { name: 'Why Sponsor', href: '/sponsor' },
    { name: 'Testimonials', href: '/testimonials' },
];

// ─── ANIMATION VARIANTS ───────────────────────────────────────────────────────

const megaMenuVariants: Variants = {
    hidden: { opacity: 0, y: -8, scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
    exit: {
        opacity: 0,
        y: -8,
        scale: 0.98,
        transition: { duration: 0.15, ease: 'easeIn' },
    },
};

const mobileDrawerVariants: Variants = {
    hidden: { x: '100%', opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
    exit: {
        x: '100%',
        opacity: 0,
        transition: { duration: 0.22, ease: 'easeIn' },
    },
};

const accordionVariants: Variants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
        height: 'auto',
        opacity: 1,
        transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
    exit: {
        height: 0,
        opacity: 0,
        transition: { duration: 0.18, ease: 'easeIn' },
    },
};

// ─── MEGA MENU PANEL ──────────────────────────────────────────────────────────

function MegaMenuPanel({ groups }: { groups: MegaGroup[] }) {
    return (
        <motion.div
            variants={megaMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute left-1/2 top-full mt-3 -translate-x-1/2 z-50"
            style={{ minWidth: '560px' }}
        >
            {/* Glass card */}
            <div
                className="rounded-2xl border border-purple-500/20 p-6 shadow-2xl"
                style={{
                    background: 'rgba(6, 0, 16, 0.95)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    boxShadow: '0 8px 40px rgba(139, 92, 246, 0.18), 0 2px 12px rgba(0,0,0,0.5)',
                }}
            >
                {/* Top accent line */}
                <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />

                <div className="flex gap-8">
                    {groups.map((group) => (
                        <div key={group.heading} className="flex-1 min-w-[200px]">
                            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-purple-400/80">
                                {group.heading}
                            </p>
                            <div className="flex flex-col gap-1">
                                {group.items.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className="group/item flex items-start gap-3 rounded-xl p-3 transition-all duration-200 hover:bg-purple-500/10"
                                            style={{ outline: 'none' }}
                                        >
                                            <div
                                                className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-purple-500/20 bg-purple-500/10 transition-all duration-200 group-hover/item:border-purple-400/40 group-hover/item:bg-purple-500/20"
                                            >
                                                <Icon className="h-4 w-4 text-purple-400" />
                                            </div>
                                            <div>
                                                <p className="flex items-center gap-1.5 text-sm font-semibold text-white/90 transition-colors group-hover/item:text-purple-300">
                                                    {item.name}
                                                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 transition-all duration-200 group-hover/item:opacity-100 group-hover/item:translate-x-0" />
                                                </p>
                                                <p className="mt-0.5 text-xs leading-relaxed text-zinc-400">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────

export function Navbar() {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [activeMega, setActiveMega] = React.useState<string | null>(null);
    const [mobileExpanded, setMobileExpanded] = React.useState<string | null>(null);
    const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    // Delayed close so mouse moving from trigger → panel doesn't flicker
    const openMega = (name: string) => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        setActiveMega(name);
    };
    const closeMega = () => {
        closeTimer.current = setTimeout(() => setActiveMega(null), 120);
    };
    const cancelClose = () => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
    };

    // Lock body scroll when mobile menu is open
    React.useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    return (
        <>
            <header className="sticky top-0 z-50 w-full">
                {/* Glassmorphic bar */}
                <div
                    className="border-b border-purple-500/10"
                    style={{
                        background: 'rgba(6, 0, 16, 0.72)',
                        backdropFilter: 'blur(18px)',
                        WebkitBackdropFilter: 'blur(18px)',
                    }}
                >
                    <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">

                        {/* LOGO */}
                        <Link href="/" className="group flex items-center gap-2">
                            <motion.div
                                initial={{ opacity: 0, x: -18 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className="flex items-center gap-3"
                            >
                                <div className="relative h-10 w-10 overflow-hidden rounded-lg drop-shadow-lg transition-transform duration-300 group-hover:scale-105">
                                    <Image
                                        src="/logos/hrwest_logo_white.png"
                                        alt="HRWest Logo"
                                        fill
                                        className="object-contain"
                                        sizes="40px"
                                    />
                                </div>
                                <span className="text-xl font-black tracking-tight flex items-baseline">
                                    <span
                                        style={{
                                            background: 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 50%, #c084fc 100%)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                        }}
                                    >
                                        HR
                                    </span>
                                    <span className="text-white">West</span>
                                    <span className="ml-1.5 text-xs font-semibold text-zinc-400">2026</span>
                                </span>
                            </motion.div>
                        </Link>

                        {/* DESKTOP NAV */}
                        <nav className="hidden md:flex items-center gap-1">
                            {NAV_LINKS.map((link) => (
                                <div
                                    key={link.name}
                                    className="relative"
                                    onMouseEnter={() => link.mega && openMega(link.name)}
                                    onMouseLeave={() => link.mega && closeMega()}
                                >
                                    {link.mega ? (
                                        <button
                                            aria-expanded={activeMega === link.name}
                                            className={`group flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${activeMega === link.name
                                                ? 'bg-purple-500/15 text-purple-300'
                                                : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                                                }`}
                                        >
                                            {link.name}
                                            <ChevronDown
                                                className={`h-3.5 w-3.5 transition-transform duration-300 ${activeMega === link.name ? 'rotate-180 text-purple-400' : 'text-zinc-500'
                                                    }`}
                                            />
                                        </button>
                                    ) : (
                                        <Link
                                            href={link.href}
                                            className="flex items-center rounded-lg px-4 py-2.5 text-sm font-semibold text-zinc-300 transition-all duration-200 hover:bg-white/5 hover:text-white"
                                        >
                                            {link.name}
                                        </Link>
                                    )}

                                    {/* MEGA MENU PANEL */}
                                    {link.mega && (
                                        <AnimatePresence>
                                            {activeMega === link.name && (
                                                <div
                                                    onMouseEnter={cancelClose}
                                                    onMouseLeave={closeMega}
                                                >
                                                    <MegaMenuPanel groups={link.mega} />
                                                </div>
                                            )}
                                        </AnimatePresence>
                                    )}
                                </div>
                            ))}
                        </nav>

                        {/* META DATA (Date & Location) + REGISTER CTA + MOBILE TOGGLE */}
                        <div className="flex items-center gap-5">
                            {/* Desktop Event Meta */}
                            <div className="hidden lg:flex items-center gap-4 border-r border-white/10 pr-5">
                                <div className="flex flex-col items-end">
                                    <div className="flex items-center gap-1.5 text-zinc-300">
                                        <CalendarDays className="h-3 w-3 text-purple-400" />
                                        <span className="text-xs font-medium">June 9–10</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-zinc-500 mt-0.5">
                                        <span className="text-[10px] font-medium tracking-wider uppercase">San Francisco, CA</span>
                                    </div>
                                </div>
                            </div>

                            <Link
                                href="/register"
                                className="group hidden md:inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
                                style={{
                                    background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                                    boxShadow: '0 0 20px rgba(139, 92, 246, 0.35)',
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLElement).style.boxShadow = '0 0 32px rgba(139, 92, 246, 0.55)';
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(139, 92, 246, 0.35)';
                                }}
                            >
                                Register Now
                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>

                            {/* Mobile hamburger */}
                            <button
                                className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10"
                                onClick={() => setMobileOpen(!mobileOpen)}
                                aria-label="Toggle menu"
                            >
                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.div
                                        key={mobileOpen ? 'close' : 'open'}
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.15 }}
                                    >
                                        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                                    </motion.div>
                                </AnimatePresence>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* ── MOBILE DRAWER ─────────────────────────────────────────────── */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
                            onClick={() => setMobileOpen(false)}
                        />

                        {/* Drawer panel */}
                        <motion.div
                            key="drawer"
                            variants={mobileDrawerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="fixed right-0 top-0 z-50 flex h-full w-80 max-w-[90vw] flex-col md:hidden"
                            style={{
                                background: 'rgba(10, 1, 24, 0.97)',
                                backdropFilter: 'blur(24px)',
                                borderLeft: '1px solid rgba(139, 92, 246, 0.15)',
                            }}
                        >
                            {/* Drawer header */}
                            <div className="flex items-center justify-between border-b border-white/5 px-6 py-5">
                                <span className="text-base font-bold text-white">Menu</span>
                                <button
                                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-zinc-400 hover:text-white"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>

                            {/* Drawer body */}
                            <div className="flex-1 overflow-y-auto px-4 py-4">
                                <div className="flex flex-col gap-1">
                                    {NAV_LINKS.map((link) => (
                                        <div key={link.name}>
                                            {link.mega ? (
                                                <>
                                                    {/* Accordion trigger */}
                                                    <button
                                                        onClick={() =>
                                                            setMobileExpanded(
                                                                mobileExpanded === link.name ? null : link.name
                                                            )
                                                        }
                                                        className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-base font-semibold text-white/90 transition-colors hover:bg-white/5"
                                                    >
                                                        {link.name}
                                                        <ChevronDown
                                                            className={`h-4 w-4 text-zinc-500 transition-transform duration-300 ${mobileExpanded === link.name ? 'rotate-180 text-purple-400' : ''
                                                                }`}
                                                        />
                                                    </button>

                                                    {/* Accordion content */}
                                                    <AnimatePresence initial={false}>
                                                        {mobileExpanded === link.name && (
                                                            <motion.div
                                                                variants={accordionVariants}
                                                                initial="hidden"
                                                                animate="visible"
                                                                exit="exit"
                                                                className="overflow-hidden"
                                                            >
                                                                <div className="ml-3 mb-2 mt-1 border-l border-purple-500/20 pl-4">
                                                                    {link.mega.map((group) => (
                                                                        <div key={group.heading} className="mb-4">
                                                                            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-purple-400/70">
                                                                                {group.heading}
                                                                            </p>
                                                                            <div className="flex flex-col gap-1">
                                                                                {group.items.map((item) => {
                                                                                    const Icon = item.icon;
                                                                                    return (
                                                                                        <Link
                                                                                            key={item.name}
                                                                                            href={item.href}
                                                                                            onClick={() => setMobileOpen(false)}
                                                                                            className="flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-purple-500/10"
                                                                                        >
                                                                                            <Icon className="mt-0.5 h-4 w-4 shrink-0 text-purple-400" />
                                                                                            <div>
                                                                                                <p className="text-sm font-semibold text-white/85">
                                                                                                    {item.name}
                                                                                                </p>
                                                                                                <p className="mt-0.5 text-xs text-zinc-500">
                                                                                                    {item.description}
                                                                                                </p>
                                                                                            </div>
                                                                                        </Link>
                                                                                    );
                                                                                })}
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </>
                                            ) : (
                                                <Link
                                                    href={link.href}
                                                    onClick={() => setMobileOpen(false)}
                                                    className="flex items-center rounded-xl px-4 py-3.5 text-base font-semibold text-white/90 transition-colors hover:bg-white/5 hover:text-white"
                                                >
                                                    {link.name}
                                                </Link>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Drawer footer CTA */}
                            <div className="border-t border-white/5 p-4">
                                <Link
                                    href="/register"
                                    onClick={() => setMobileOpen(false)}
                                    className="flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-base font-bold text-white transition-all active:scale-95"
                                    style={{
                                        background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                                        boxShadow: '0 0 24px rgba(139, 92, 246, 0.4)',
                                    }}
                                >
                                    <Star className="h-4 w-4" />
                                    Register Now
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
