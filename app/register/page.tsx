import * as React from 'react';
import { PageHeroBanner } from '@/components/ui/page-hero-banner';
import { ComingSoonPlaceholder } from '@/components/sections/coming-soon-placeholder';

export default function RegisterPage() {
    return (
        <main className="flex flex-col min-h-screen bg-[#060010]">
            <PageHeroBanner
                headline="HRWest Registration"
                tagline="Join the HR community at HRWest 2026 in San Francisco!"
                description={
                    <>
                        Practical insights you can use, peers you can learn from, and pricing that respects your budget. It&apos;s <strong className="font-bold text-white">built for real HR professionals like you.</strong> Celebrating 40+ years of amazing HR education and networking!
                    </>
                }
                blendImage="/images/register_hero.png"
                blendImageAlt="Enthusiastic professional woman pointing at registration"
            />

            <div className="flex flex-col">
                <ComingSoonPlaceholder
                    title="Registration Packages & Pricing"
                    description="We are locking in our tier pricing, group discounts, and standard rates. Check back soon for full details and to secure your pass."
                />
                <ComingSoonPlaceholder
                    title="Hotel & Travel Information"
                    description="Exclusive hotel block rates for the South San Francisco Conference Center are being negotiated."
                    icon="hammer"
                    className="bg-[#0a0118]"
                />
            </div>
        </main>
    );
}
