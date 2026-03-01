import * as React from 'react';
import { PageHeroBanner } from '@/components/ui/page-hero-banner';
import { TestimonialCardsGrid, Testimonial } from '@/components/sections/testimonial-cards-grid';

const attendeeTestimonials: Testimonial[] = [
    {
        quote: "I picked up some great practical tips that I can take back to my office and use right away.",
        colorVariant: 'yellow',
    },
    {
        quote: "Things are ever-evolving, so to be able to attend something like this with like-minded individuals is great.",
        colorVariant: 'green',
    },
    {
        quote: "I think it was very insightful, very informative. It's good to know that the people who are speaking are experts in this field. There's a lot to gain from that.",
        colorVariant: 'purple',
    },
    {
        quote: "I absolutely loved the sponsors at HRWest this year. You talk about the gamut of softwares or products that really impact how to do our jobs easier. Sometimes in HR we're a small team of people and we have to put together all these resources, and I'll tell you the sponsors are full of fantastic ideas that will take our HR work to the next level.",
        colorVariant: 'pink',
    },
    {
        quote: "I couldn't be happier to be part of this community and contribute to it, because it is so incredibly important, now more than ever.",
        colorVariant: 'yellow',
    }
];

const sponsorTestimonials: Testimonial[] = [
    {
        quote: "My team and I were really well taken care of by the HR.com staff ... We had people coming up to our booth throughout the whole conference. It was an excellent experience for us, and we will be back.",
        author: "Gregg Ward",
        organization: "The Center for Respectful Leadership",
        colorVariant: 'yellow',
    },
    {
        quote: "It was a really good experience — met some wonderful people and had amazing conversations.",
        author: "Chezuba",
        colorVariant: 'green',
    },
    {
        quote: "I had a great time at the event. I was able to connect and meet new people, share the value of our software, and join in a couple of sessions myself.",
        colorVariant: 'purple',
    }
];

export default function TestimonialsPage() {
    return (
        <main className="flex flex-col min-h-screen bg-background">
            <PageHeroBanner
                headline="Testimonials"
                tagline="Attendee and Sponsor Raves!"
                ctaText="Register Now"
                ctaHref="/register"
                secondaryCtaText="Sponsor Information"
                secondaryCtaHref="/sponsor"
                blendImage="/images/testimonials_hero.png"
                blendImageAlt="Professionals conversing happily"
            />

            <div className="flex flex-col pb-20 bg-background">
                <TestimonialCardsGrid title="Attendees Say ..." testimonials={attendeeTestimonials} />
                <TestimonialCardsGrid title="Sponsors Say ..." testimonials={sponsorTestimonials} />
            </div>
        </main>
    );
}
