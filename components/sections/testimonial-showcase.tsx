'use client';

import * as React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquareQuote } from 'lucide-react';
import { BrandMotif } from '@/components/ui/brand-motif';

// Import the extracted CardSwap component
import CardSwap, { Card } from '@/components/ui/card-swap';

export type Testimonial = {
    quote: string;
    author?: string;
    organization?: string;
    colorVariant: 'yellow' | 'green' | 'purple' | 'pink';
    size?: 'small' | 'large';
};

export type TestimonialCategory = {
    id: string;
    label: string;
    testimonials: Testimonial[];
};

interface TestimonialShowcaseProps {
    categories: TestimonialCategory[];
}

const EASE = [0.22, 1, 0.36, 1] as const;

const borderTopColors = {
    yellow: 'bg-gradient-to-r from-transparent via-[#FDB414] to-transparent',
    green: 'bg-gradient-to-r from-transparent via-green-500 to-transparent',
    purple: 'bg-gradient-to-r from-transparent via-accent to-transparent',
    pink: 'bg-gradient-to-r from-transparent via-pink-500 to-transparent',
};

const innerBorderColors = {
    yellow: 'border-[#FDB414]/30',
    green: 'border-green-500/30',
    purple: 'border-accent/30',
    pink: 'border-pink-500/30',
};


export function TestimonialShowcase({ categories }: TestimonialShowcaseProps) {
    const [activeTabId, setActiveTabId] = useState(categories[0]?.id);
    const activeCategory = categories.find((c) => c.id === activeTabId) || categories[0];

    return (
        <section className="relative py-12 lg:py-16 bg-[#060010] overflow-hidden min-h-[900px] flex items-center">
            {/* Ambient Glow */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(139,92,246,0.07),transparent)]" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 w-full">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">

                    {/* ── Left Column: Text & Controls ── */}
                    <div className="flex flex-col items-start text-left">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, ease: EASE }}
                            className="mb-8"
                        >
                            <BrandMotif size={6} gap={10} />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
                            className="mb-5"
                        >
                            <span className="glass inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-primary shadow-lg shadow-primary/10">
                                <MessageSquareQuote className="h-4 w-4" />
                                <span className="flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                                Community Voices
                            </span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground mb-6 leading-tight max-w-2xl"
                        >
                            Card stacks have never{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-[#c084fc] drop-shadow-sm">
                                looked so good.
                            </span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
                            className="text-base sm:text-lg text-foreground/55 leading-relaxed max-w-xl mb-12"
                        >
                            Discover why HR professionals and top industry sponsors keep coming back year after year. Read the testimonials from our incredible community.
                        </motion.p>

                        {/* ── Tabs ── */}
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/5 p-1.5 backdrop-blur-md border border-white/10 shadow-xl self-start">
                            {categories.map((category) => {
                                const isActive = activeTabId === category.id;
                                return (
                                    <button
                                        key={category.id}
                                        onClick={() => setActiveTabId(category.id)}
                                        className={`relative rounded-full px-8 py-3 text-sm font-semibold transition-colors duration-300 ${isActive ? 'text-white' : 'text-foreground/50 hover:text-foreground/80'
                                            }`}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeTabBadge"
                                                className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-primary shadow-lg shadow-primary/25"
                                                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                        <span className="relative z-10">{category.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* ── Right Column: CardSwap ── */}
                    <div className="relative h-[600px] w-full flex justify-center items-center perspective-[1200px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTabId} /* Remount CardSwap when tab changes */
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.5, ease: EASE }}
                                className="w-full h-full absolute inset-0 left-0 top-0 flex items-center justify-center transform scale-90 lg:scale-100 lg:translate-y-0 translate-y-20 origin-center lg:origin-bottom-right"
                            >
                                <CardSwap
                                    width={450}
                                    height={300}
                                    cardDistance={40}
                                    verticalDistance={50}
                                    delay={4000}
                                    pauseOnHover={true}
                                >
                                    {activeCategory.testimonials.map((testimonial, idx) => (
                                        <Card
                                            key={idx}
                                            customClass={`!bg-[#0a0514] !border-0 flex flex-col p-8 rounded-[2rem] shadow-2xl overflow-hidden shadow-black/50 ${innerBorderColors[testimonial.colorVariant]}`}
                                        >
                                            {/* Stylized background grid or noise optional */}
                                            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom_right,rgba(255,255,255,0.02),transparent)]" />

                                            {/* Elegant Top Border highlight based on color */}
                                            <div className={`absolute left-0 top-0 h-[2px] w-full ${borderTopColors[testimonial.colorVariant]}`} />

                                            {/* Glow overlay */}
                                            <div className={`absolute -inset-px rounded-[2rem] border pointer-events-none opacity-50 ${innerBorderColors[testimonial.colorVariant]}`} />

                                            <div className="flex-1 overflow-hidden relative z-10">
                                                <div className="text-4xl leading-none font-serif text-accent mb-4 opacity-40">
                                                    &ldquo;
                                                </div>
                                                <p className="text-sm sm:text-base text-foreground/80 font-medium leading-relaxed max-h-[140px] overflow-y-auto pr-2 custom-scrollbar">
                                                    {testimonial.quote}
                                                </p>
                                            </div>

                                            {/* Author / Org */}
                                            {(testimonial.author || testimonial.organization) && (
                                                <div className="mt-4 pt-4 border-t border-white/10 relative z-10 shrink-0">
                                                    {testimonial.author && (
                                                        <p className="text-sm font-bold text-foreground overflow-hidden text-ellipsis whitespace-nowrap">
                                                            {testimonial.author}
                                                        </p>
                                                    )}
                                                    {testimonial.organization && (
                                                        <p className="text-xs font-semibold uppercase tracking-wider text-accent mt-1 overflow-hidden text-ellipsis whitespace-nowrap">
                                                            {testimonial.organization}
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                        </Card>
                                    ))}
                                </CardSwap>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </div>

            {/* Bottom Glow */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#060010] to-transparent z-0" />

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
            `}</style>
        </section>
    );
}
