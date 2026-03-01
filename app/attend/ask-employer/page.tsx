import * as React from 'react';
import { PageHeroBanner } from '@/components/ui/page-hero-banner';
import { ComingSoonPlaceholder } from '@/components/sections/coming-soon-placeholder';

export default function AskEmployerPage() {
    return (
        <main className="flex flex-col min-h-screen bg-[#060010]">
            <PageHeroBanner
                eyebrow="Make Your Case"
                eyebrowIconName="BookOpen"
                headline="Get Your Employer to Send You to HRWest"
                tagline="Helpful materials and information to make your business case"
                ctaText="Register Now"
                ctaHref="/register"
                blendImage="/images/ask_employer_hero.png"
                blendImageAlt="Professionals discussing opportunities"
            />

            <div className="flex flex-col">
                <ComingSoonPlaceholder
                    title="Business Case Templates"
                    description="We are preparing downloadable templates and letters to help you effectively communicate the ROI of attending HRWest to your leadership."
                />
                <ComingSoonPlaceholder
                    title="Cost & ROI Breakdown"
                    description="A detailed financial breakdown and justification guide is currently being finalized to support your request."
                    icon="hammer"
                    className="bg-[#0a0118]"
                />
            </div>
        </main>
    );
}
