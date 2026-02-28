'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react';

const NAV_LINKS = [
    {
        name: 'Program',
        href: '#',
        dropdown: [
            { name: 'Speakers', href: '/program/speakers' },
            { name: '2025 Agenda', href: '/program/agenda' },
            { name: 'Sponsors', href: '/program/sponsors' },
            { name: 'FutureHR: The Ultimate Startup Showdown', href: '/program/future-hr' },
        ]
    },
    {
        name: 'Attend',
        href: '#',
        dropdown: [
            { name: 'Attend as Team', href: '/attend/team' },
            { name: 'Volunteer', href: '/attend/volunteer' },
            { name: 'Get Your Employer to Send You to HRWest', href: '/attend/ask-employer' },
        ]
    },
    { name: 'Why Sponsor/Exhibit', href: '/sponsor' },
    { name: 'Testimonials', href: '/testimonials' },
];

export function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);

    const toggleDropdown = (name: string) => {
        if (activeDropdown === name) setActiveDropdown(null);
        else setActiveDropdown(name);
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
            <div className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-8">
                {/* LOGO */}
                <Link href="/" className="flex items-center space-x-2">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-2xl font-bold tracking-tighter text-primary"
                    >
                        HR<span className="text-foreground">West</span> 2026
                    </motion.div>
                </Link>

                {/* DESKTOP NAV */}
                <nav className="hidden md:flex items-center space-x-8">
                    {NAV_LINKS.map((link, idx) => (
                        <div key={link.name} className="relative group"
                            onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                            onMouseLeave={() => link.dropdown && setActiveDropdown(null)}
                        >
                            {link.dropdown ? (
                                <button className="flex items-center space-x-1 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors py-8">
                                    <span>{link.name}</span>
                                    <ChevronDown className="h-4 w-4" />
                                </button>
                            ) : (
                                <Link href={link.href} className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors py-8 inline-block">
                                    {link.name}
                                </Link>
                            )}

                            {/* DROPDOWN MENU */}
                            {link.dropdown && (
                                <AnimatePresence>
                                    {activeDropdown === link.name && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute left-0 top-full -mt-2 w-64 rounded-md border bg-popover text-popover-foreground shadow-md outline-none"
                                        >
                                            <div className="flex flex-col py-2">
                                                {link.dropdown.map((dropItem) => (
                                                    <Link
                                                        key={dropItem.name}
                                                        href={dropItem.href}
                                                        className="px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                                                    >
                                                        {dropItem.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            )}
                        </div>
                    ))}

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Link href="/register" className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-6 py-2 text-sm font-bold text-primary-foreground shadow-lg transition-transform hover:-translate-y-0.5 hover:shadow-primary/25">
                            Register Now
                        </Link>
                    </motion.div>
                </nav>

                {/* MOBILE TOGGLE */}
                <button
                    className="md:hidden p-2 text-foreground"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* MOBILE NAV MENU */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="md:hidden border-t border-border/40 bg-background px-4 py-4"
                >
                    <div className="flex flex-col space-y-4">
                        {NAV_LINKS.map((link) => (
                            <div key={link.name}>
                                {link.dropdown ? (
                                    <div className="flex flex-col space-y-2">
                                        <button
                                            onClick={() => toggleDropdown(link.name)}
                                            className="flex items-center justify-between text-lg font-semibold text-foreground w-full text-left"
                                        >
                                            {link.name}
                                            {activeDropdown === link.name ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                                        </button>
                                        {activeDropdown === link.name && (
                                            <div className="flex flex-col space-y-2 pl-4 border-l-2 border-primary/20">
                                                {link.dropdown.map(drop => (
                                                    <Link
                                                        key={drop.name}
                                                        href={drop.href}
                                                        onClick={() => setIsOpen(false)}
                                                        className="text-base text-muted-foreground"
                                                    >
                                                        {drop.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-lg font-semibold text-foreground"
                                    >
                                        {link.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                        <Link
                            href="/register"
                            onClick={() => setIsOpen(false)}
                            className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-6 py-2 text-base font-bold text-primary-foreground mt-4"
                        >
                            Register Now
                        </Link>
                    </div>
                </motion.div>
            )}
        </header>
    );
}

