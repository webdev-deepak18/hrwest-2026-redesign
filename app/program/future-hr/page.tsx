import * as React from 'react';
import { PageHeroBanner } from '@/components/ui/page-hero-banner';
import { ComingSoonPlaceholder } from '@/components/sections/coming-soon-placeholder';

export default function FutureHRPage() {
    return (
        <main className="flex flex-col min-h-screen bg-[#060010]">
            <PageHeroBanner
                eyebrow="FutureHR Showdown"
                eyebrowIconName="Award"
                headline="FutureHR: The Ultimate Startup Showdown"
                tagline="Compete For Prizes And The Title Of HR.Com Startup Of The Year!"
                description="Please view eligibility criteria before entering"
                ctaText="Submit Entry - It's Free"
                ctaHref="#submit"
                blendImage="/images/future_hr_hero.png"
                blendImageAlt="Startup Showdown Rocket Launch"
            />

            <div className="flex flex-col">
                <ComingSoonPlaceholder
                    title="Eligibility & Criteria"
                    description="We are finalizing the exact eligibility requirements and rubrics for the showroom pitching competition. Stay tuned for the complete guidelines."
                />
                <ComingSoonPlaceholder
                    title="Prizes & Categories"
                    description="Incredible rewards await the top HR startups. The prize list is currently being curated."
                    icon="hammer"
                    className="bg-[#0a0118]" // Slightly different background to alternate
                />
                <ComingSoonPlaceholder
                    title="Judging Panel"
                    description="Our world-class panel of investors and HR executives is being assembled."
                />
            </div>
        </main>
    );
}
