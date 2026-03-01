'use client';

import * as React from 'react';
import { motion } from 'framer-motion';

export type Testimonial = {
    quote: string;
    author?: string;
    organization?: string;
    colorVariant: 'yellow' | 'green' | 'purple' | 'pink';
};

interface TestimonialCardsGridProps {
    title: string;
    testimonials: Testimonial[];
}

const colorMap = {
    yellow: 'bg-[#FFFAE3]', // Light yellow
    green: 'bg-[#EAF6ED]',  // Light green
    purple: 'bg-[#F4EBF6]', // Light purple
    pink: 'bg-[#FBEBEA]',   // Light pink
};

export function TestimonialCardsGrid({ title, testimonials }: TestimonialCardsGridProps) {
    return (
        <section className="relative w-full bg-background pt-16 pb-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Header with gradient line */}
                <div className="flex items-center gap-6 mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground whitespace-nowrap">
                        {title}
                    </h2>
                    <div
                        className="h-1 flex-grow rounded-full"
                        style={{ background: 'linear-gradient(to right, #0076CE, #EF4A3D, #FDB414)' }}
                    />
                </div>

                {/* Cards Container */}
                <div className="flex flex-wrap gap-6">
                    {testimonials.map((testimonial, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: idx * 0.1, ease: 'easeOut' }}
                            className={`flex flex-col flex-grow basis-[calc(33.333%-1rem)] min-w-[300px] p-8 sm:p-10 shadow-sm ${colorMap[testimonial.colorVariant]} rounded-[2.5rem] rounded-tl-xl hover:shadow-md transition-shadow duration-300`}
                        >
                            {/* Giant Quotes Icon */}
                            <div className="text-6xl leading-none font-serif text-[#EF4A3D] mb-4 opacity-90">
                                &ldquo;
                            </div>

                            {/* Quote Text */}
                            <p className="text-lg text-foreground/80 leading-relaxed font-medium mb-auto">
                                {testimonial.quote}
                            </p>

                            {/* Optional Author/Org */}
                            {(testimonial.author || testimonial.organization) && (
                                <div className="mt-8 pt-4 border-t border-black/5">
                                    {testimonial.author && (
                                        <p className="text-sm font-bold italic text-foreground/90">
                                            &mdash; {testimonial.author}
                                        </p>
                                    )}
                                    {testimonial.organization && (
                                        <p className="text-xs font-semibold uppercase tracking-wider text-foreground/60 mt-1">
                                            {testimonial.organization}
                                        </p>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
