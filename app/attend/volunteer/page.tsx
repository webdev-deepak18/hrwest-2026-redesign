import * as React from 'react';
import { PageHeroBanner } from '@/components/ui/page-hero-banner';
import { ComingSoonPlaceholder } from '@/components/sections/coming-soon-placeholder';

export default function VolunteerPage() {
    return (
        <main className="flex flex-col min-h-screen bg-[#060010]">
            <PageHeroBanner
                eyebrow="Join The Team"
                eyebrowIconName="Users"
                headline="Volunteer Opportunities at HRWest 2026"
                tagline="Enjoy a free conference pass!"
                ctaText="Apply to Volunteer"
                ctaHref="#apply"
                blendImage="/images/volunteer_opportunities_hero.png"
                blendImageAlt="Welcoming volunteer with open arms"
            />

            <div className="flex flex-col">
                <ComingSoonPlaceholder
                    title="Volunteer Roles & Requirements"
                    description="We are currently outlining the various roles, shift schedules, and responsibilities for our incredible volunteers."
                />
                <ComingSoonPlaceholder
                    title="Volunteer Perks"
                    description="Details on the exact benefits, including access to sessions, meals, and exclusive networking events, will be announced shortly."
                    icon="hammer"
                    className="bg-[#0a0118]"
                />
            </div>
        </main>
    );
}
