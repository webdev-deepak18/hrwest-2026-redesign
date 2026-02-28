'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TESTIMONIALS = [
    {
        id: 1,
        quote: "HRWest transformed how our organization approaches talent acquisition. The insights we gained here were implemented the very next week with incredible results.",
        author: "Elena Rodriguez",
        role: "CHRO, TechFlow Inc.",
    },
    {
        id: 2,
        quote: "The level of networking and the caliber of speakers at HRWest is unmatched. It's the one conference my entire leadership team prioritizes every single year.",
        author: "James Chen",
        role: "VP of People, GlobalData",
    },
    {
        id: 3,
        quote: "If you want to understand the future of work and how AI is reshaping HR, this is the place to be. Bold, interactive, and incredibly valuable.",
        author: "Sarah Jenkins",
        role: "Director of HR Operations, Innovate LLC",
    }
];

export function TestimonialCarousel() {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    };

    return (
        <section className="py-24 bg-primary text-primary-foreground overflow-hidden">
            <div className="container mx-auto px-4 lg:px-8">

                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                        Hear From Our Community
                    </h2>
                    <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
                        Discover why thousands of HR professionals choose HRWest as their ultimate destination for growth and inspiration.
                    </p>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    <Quote className="absolute -top-12 -left-8 md:-left-16 h-24 w-24 text-primary-foreground/10 rotate-180" />

                    <div className="relative h-64 md:h-48">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0 flex flex-col items-center justify-center text-center"
                            >
                                <p className="text-xl md:text-3xl font-medium leading-relaxed mb-8">
                                    "{TESTIMONIALS[currentIndex].quote}"
                                </p>
                                <div>
                                    <h4 className="font-bold text-lg">{TESTIMONIALS[currentIndex].author}</h4>
                                    <p className="text-primary-foreground/70 text-sm">{TESTIMONIALS[currentIndex].role}</p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="flex justify-center items-center gap-4 mt-12">
                        <button
                            onClick={handlePrev}
                            className="p-3 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors backdrop-blur-sm"
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                        <div className="flex gap-2">
                            {TESTIMONIALS.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentIndex(idx)}
                                    className={`h-2.5 rounded-full transition-all duration-300 ${currentIndex === idx ? 'w-8 bg-primary-foreground' : 'w-2.5 bg-primary-foreground/30 hover:bg-primary-foreground/50'
                                        }`}
                                    aria-label={`Go to testimonial ${idx + 1}`}
                                />
                            ))}
                        </div>
                        <button
                            onClick={handleNext}
                            className="p-3 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors backdrop-blur-sm"
                            aria-label="Next testimonial"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
}
