'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';

export function Hero() {
    return (
        <section className="relative overflow-hidden bg-background pt-24 pb-32 md:pt-36 md:pb-48">
            {/* Background Gradients */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
            <div className="absolute -top-[300px] left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/30 blur-[100px] opacity-50" />

            <div className="container mx-auto px-4 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-8"
                >
                    <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />
                    Registration for 2026 is now open
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-foreground mb-6 max-w-5xl mx-auto leading-tight"
                >
                    The Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Work</span> Starts Here.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-lg md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto font-medium"
                >
                    Discover cutting-edge strategies, connect with visionary leaders, and build the high-performance teams of tomorrow at HRWest 2026.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
                >
                    <Link
                        href="/attend"
                        className="w-full sm:w-auto inline-flex h-14 items-center justify-center rounded-full bg-primary px-8 text-lg font-bold text-primary-foreground shadow-xl transition-all hover:scale-105 hover:shadow-primary/30 group"
                    >
                        Secure Your Spot
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link
                        href="/program/agenda"
                        className="w-full sm:w-auto inline-flex h-14 items-center justify-center rounded-full border-2 border-border bg-transparent px-8 text-lg font-bold text-foreground transition-all hover:bg-muted"
                    >
                        View the Agenda
                    </Link>
                </motion.div>

                {/* Event Meta Details */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="flex flex-col md:flex-row items-center justify-center gap-8 text-muted-foreground"
                >
                    <div className="flex items-center">
                        <Calendar className="mr-3 h-6 w-6 text-primary" />
                        <span className="font-semibold text-lg text-foreground">March 24-26, 2026</span>
                    </div>
                    <div className="hidden md:block h-6 w-px bg-border" />
                    <div className="flex items-center">
                        <MapPin className="mr-3 h-6 w-6 text-accent" />
                        <span className="font-semibold text-lg text-foreground">San Francisco, CA</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
