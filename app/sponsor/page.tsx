import * as React from 'react';
import { PageHeroBanner } from '@/components/ui/page-hero-banner';
import { ComingSoonPlaceholder } from '@/components/sections/coming-soon-placeholder';

export default function SponsorExhibitPage() {
    return (
        <main className="flex flex-col min-h-screen bg-[#060010]">
            <PageHeroBanner
                eyebrow="Partner With Us"
                eyebrowIconName="Layers"
                headline="Sponsor & Exhibit at HRWest 2026"
                tagline="Meet decision-makers eager to learn about HR innovations and solutions"
                ctaText="Download Sponsorship Brochure"
                ctaHref="#brochure"
                blendImage="/images/sponsor_exhibit_hero.png"
                blendImageAlt="Dynamic exhibitor booth networking"
            />

            <div className="flex flex-col">
                <ComingSoonPlaceholder
                    title="Exhibitor Packages"
                    description="We are currently designing our comprehensive layout map and tier packages tailored for maximum brand visibility."
                />
                <ComingSoonPlaceholder
                    title="Demographics & Reach"
                    description="Our attendee demographic data and ROI metrics are being compiled to help you make informed decisions."
                    icon="hammer"
                    className="bg-[#0a0118]"
                />
            </div>
        </main>
    );
}
