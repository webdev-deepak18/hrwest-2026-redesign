'use client';

import * as React from 'react';
import { motion } from 'framer-motion';

const MOCK_SPEAKERS = [
    {
        id: 1,
        name: 'Sarah Drasner',
        role: 'VP Developer Experience',
        company: 'Vercel',
        image: 'https://i.pravatar.cc/300?img=47' // Placeholder
    },
    {
        id: 2,
        name: 'Adam Wathan',
        role: 'Creator',
        company: 'Tailwind Labs',
        image: 'https://i.pravatar.cc/300?img=11'
    },
    {
        id: 3,
        name: 'Guillermo Rauch',
        role: 'CEO',
        company: 'Vercel',
        image: 'https://i.pravatar.cc/300?img=33'
    },
    {
        id: 4,
        name: 'Lee Robinson',
        role: 'VP of Product',
        company: 'Vercel',
        image: 'https://i.pravatar.cc/300?img=12'
    }
];

export function SpeakerGrid() {
    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-4 lg:px-8">

                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                    <div className="max-w-2xl">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4"
                        >
                            Learn from the <span className="text-primary tracking-tighter">Best in the Business.</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-lg text-muted-foreground"
                        >
                            Our 2026 lineup features visionaries who are actively shaping the future of HR and technology.
                        </motion.p>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="mt-6 md:mt-0"
                    >
                        <a href="/program/speakers" className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-colors">
                            View All Speakers &rarr;
                        </a>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {MOCK_SPEAKERS.map((speaker, idx) => (
                        <motion.div
                            key={speaker.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative overflow-hidden rounded-2xl bg-secondary/5 border border-border/50 p-4 transition-all hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30"
                        >
                            <div className="aspect-square w-full overflow-hidden rounded-xl mb-4 bg-muted">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={speaker.image}
                                    alt={speaker.name}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-foreground">{speaker.name}</h3>
                                <p className="text-sm font-medium text-primary mt-1">{speaker.role}</p>
                                <p className="text-sm text-muted-foreground">{speaker.company}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
