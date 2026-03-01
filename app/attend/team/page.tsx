import * as React from 'react';
import { PageHeroBanner } from '@/components/ui/page-hero-banner';
import { ComingSoonPlaceholder } from '@/components/sections/coming-soon-placeholder';
import { CheckCircle2, Mail } from 'lucide-react';

export default function TeamAttendPage() {
    return (
        <main className="flex flex-col min-h-screen bg-[#060010]">
            <PageHeroBanner
                eyebrow="Bring Your Team"
                eyebrowIconName="Users"
                headline="Team Registration"
                tagline="Save money on HRWest & help your team thrive"
                ctaText="Email Us To Reserve Spots"
                ctaHref="mailto:hrwest@hr.com?subject=Interested%20in%20Registering%20My%20Team"
                blendImage="/images/team_registration_hero.png"
                blendImageAlt="Team of professionals"
            />

            {/* Team Info Section */}
            <section className="relative z-10 mx-auto w-full max-w-5xl px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
                <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:p-12 backdrop-blur-md shadow-2xl">
                    <div className="max-w-3xl">
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-6">
                            There&apos;s no better way to enjoy HRWest than as a team.
                        </h2>
                        <p className="text-lg text-foreground/80 leading-relaxed mb-8">
                            As an HR leader, when you book HRWest registrations for your team, you:
                        </p>

                        <ul className="grid gap-4 sm:grid-cols-2 mb-10">
                            {[
                                "Enjoy substantial cost savings (details below)",
                                "Equip team members with performance-boosting skills and knowledge",
                                "Show your team that you support their development and growth",
                                "Help your team bond through a shared experience"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <CheckCircle2 className="mt-1 h-5 w-5 text-primary shrink-0" />
                                    <span className="text-foreground/80 leading-snug">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="flex items-center gap-4 rounded-2xl bg-primary/10 p-6 border border-primary/20">
                            <div className="flex bg-primary/20 p-3 rounded-full shrink-0">
                                <Mail className="h-6 w-6 text-primary" />
                            </div>
                            <p className="text-foreground/90 font-medium">
                                For more information or to reserve your spots, email us at{' '}
                                <a
                                    href="mailto:hrwest@hr.com?subject=Interested%20in%20Registering%20My%20Team"
                                    className="text-primary hover:text-white font-bold underline transition-colors"
                                >
                                    hrwest@hr.com
                                </a>{' '}
                                with the message that you&apos;re interested in registering your team.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="flex flex-col">
                <ComingSoonPlaceholder
                    title="Pricing & Group Discounts"
                    description="We are currently structuring our tiered group discount rates. Bringing more members will unlock larger savings. Pricing tables will be available soon."
                />
                <ComingSoonPlaceholder
                    title="Team Itinerary Builder"
                    description="A new tool to help sync sessions and coordinate meetups for your team is under development."
                    icon="hammer"
                    className="bg-[#0a0118]"
                />
            </div>
        </main>
    );
}
