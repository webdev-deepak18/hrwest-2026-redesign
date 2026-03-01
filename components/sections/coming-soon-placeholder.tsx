'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Hammer } from 'lucide-react';
import { BrandMotif } from '@/components/ui/brand-motif';

interface ComingSoonPlaceholderProps {
    title?: string;
    description?: string;
    icon?: 'sparkles' | 'hammer';
    className?: string;
}

export function ComingSoonPlaceholder({
    title = 'Coming Soon',
    description = 'We are actively crafting this section. Check back shortly for updates.',
    icon = 'sparkles',
    className = ''
}: ComingSoonPlaceholderProps) {
    return (
        <section className={`relative w-full overflow-hidden bg-[#060010] py-24 sm:py-32 ${className}`}>
            {/* Ambient Background Glow */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(139,92,246,0.05),transparent)]" />

            <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="relative flex flex-col items-center justify-center rounded-3xl border border-white/5 bg-white/[0.02] px-8 py-20 backdrop-blur-xl shadow-2xl shadow-primary/5"
                >
                    {/* Floating Motifs */}
                    <div className="absolute inset-0 overflow-hidden rounded-3xl [mask-image:linear-gradient(to_bottom,white,transparent)]">
                        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 opacity-20 blur-3xl">
                            <div className="h-64 w-64 rounded-full bg-primary" />
                        </div>
                    </div>

                    <div className="relative z-10 mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-[0_0_40px_rgba(139,92,246,0.2)]">
                        {icon === 'sparkles' ? (
                            <Sparkles className="h-10 w-10 text-primary animate-pulse" />
                        ) : (
                            <Hammer className="h-10 w-10 text-primary/80" />
                        )}
                    </div>

                    <div className="relative z-10 space-y-4">
                        <div className="flex justify-center mb-6">
                            <BrandMotif className="scale-125" size={8} gap={10} />
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-transparent bg-clip-text bg-gradient-to-br from-white to-white/60 pb-2">
                            {title}
                        </h2>
                        <p className="mx-auto max-w-lg text-lg text-foreground/60 leading-relaxed font-medium">
                            {description}
                        </p>
                    </div>

                    {/* Progress indicator pulse */}
                    <div className="relative z-10 mt-10 flex items-center justify-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary/40 animate-[pulse_1.5s_ease-in-out_infinite]" />
                        <div className="h-1.5 w-1.5 rounded-full bg-primary/40 animate-[pulse_1.5s_ease-in-out_0.2s_infinite]" />
                        <div className="h-1.5 w-1.5 rounded-full bg-primary/40 animate-[pulse_1.5s_ease-in-out_0.4s_infinite]" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
